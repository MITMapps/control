import asyncio
import os
import typing
from mitmproxy.addons import script
from mitmproxy import ctx, hooks
from mitmproxy.addons.script import ReloadInterval


class MITMapps:
    """
        An addon that keeps multiple mitmapps loaded
    """

    def __init__(self):
        self.apps = []
        self.app_dir = '/Users/matt/Desktop/apps_dir'
        self.is_running = False
        self.reloadtask = asyncio.ensure_future(self.watcher())

    def load(self, loader):
        loader.add_option(
            "mitmapps_dir", str, '',
            "Man In The Middle App Directory. Integrates with MITMapps Terrier"
        )

    @property
    def addons(self):
        return self.apps

    def running(self):
        self.is_running = True

    async def watcher(self):
        last_mtime = 0
        while True:
            mtime = os.stat(self.app_dir).st_mtime
            if mtime > last_mtime:
                # delete apps that are no longer there
                for mitm_app in self.apps:
                    if not os.path.isfile(mitm_app.path):
                        ctx.log.info("MITMapps removing: %s" % mitm_app.path)
                        ctx.master.addons.remove(mitm_app)
                        self.apps.remove(mitm_app)

                # add new apps
                for mitm_app in os.listdir(self.app_dir):
                    if '.py' in mitm_app[-4:] and mitm_app not in [app.path for app in self.apps]:
                        full_path = os.path.join(self.app_dir, mitm_app)
                        ctx.log.info("MITMapps adding: %s" % full_path)
                        new_app = script.Script(full_path, True)
                        self.apps.append(new_app)
                        ctx.master.addons.register(new_app)
                        if self.is_running:
                            # If we're already running, we configure and tell the addon
                            # we're up and running.
                            ctx.master.addons.invoke_addon(new_app, hooks.RunningHook())
                last_mtime = mtime
            await asyncio.sleep(ReloadInterval)


addons = [
    MITMapps()
]
