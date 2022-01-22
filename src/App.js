import './App.css';
import React from 'react';


class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
        {product.name}
      </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            /// so here we can add the product category row if the category changed. Neat. But this assumes the
            /// data is structured such that
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}/>
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}/>
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..."/>
                <p>
                    <input type="checkbox"/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    render() {
        return (
            <div>
                <SearchBar/>
                <ProductTable products={this.props.products}/>
            </div>
        );
    }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}];

export default App;


///////// MY SHIT

class SelectApplication extends React.Component {
    render() {
        return (
            <div className="col">
                <InstalledApplications/>
                <CommunityApplications/>
            </div>
        )
    }
}

class InstalledApplications extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        installed applications
                    </div>
                    <ApplicationList/>
                </div>
            </div>
        )
    }
}

class ApplicationList extends React.Component {
    render() {
        return (
            <div className="row" style={{overflow: 'scroll', height: '340px'}}>
                <ul>
                    <ClickableApplication appname='Application one'/>
                    <ClickableApplication appname='Application two'/>
                    <ClickableApplication appname='Application three'/>
                </ul>
            </div>
        )
    }
}

class CommunityApplications extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="row">
                        <br/>
                        community applications
                    </div>
                    <SearchApplications/>
                    <SearchResults/>
                </div>
            </div>
        )
    }
}

class SearchApplications extends React.Component {
    render() {
        return (
            <div className="row">
                <input id="search" name="search" autoFocus="True" size="40"
                       placeholder="search by app name"/>
            </div>
        )
    }
}

class SearchResults extends React.Component {
    render() {
        return (
            <div className="row">
                <ul>
                    <ClickableApplication appname='Application one'/>
                    <ClickableApplication appname='Application two'/>
                    <ClickableApplication appname='Application three'/>
                </ul>
            </div>
        )
    }
}

class SelectedApplication extends React.Component {
    render() {
        return (
            <div className="col">
                <ApplicationControl/>
                <ApplicationCode/>
            </div>
        )
    }
}

class ApplicationControl extends React.Component {
    render() {
        return (
            <div className="row">
                <ApplicationName/>
                <InstallApplicationButton/>
            </div>
        )
    }
}

class ApplicationName extends React.Component {
    render() {
        return (
            <div className="col">
                Selected App Name
            </div>
        )
    }
}

class InstallApplicationButton extends React.Component {
    render() {
        return (
            <div className="col">
                install application
            </div>
        )
    }
}

class ApplicationCode extends React.Component {
    render() {
        return (
            <div className="row" style={{overflow: 'scroll', height: '800px', borderStyle: 'solid'}}>
                code
            </div>
        )
    }
}

class ClickableApplication extends React.Component {
    render() {
        return (
            <li>{this.props.appname}</li>
        )
    }
}

class Control extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row" style={{height: '100px'}}>
                    <br/>
                    Control Man-In-The-Middle Applications
                </div>
                <div className="row">
                    <div className="col-lg">
                        <div className="row">
                            <SelectApplication/>
                            <SelectedApplication/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const APPS = [{
    python: "from mitmproxy import http from mitmproxy import ctx class FeedKiller: def __init__(self): self.num = 0 def response(self, flow: http.HTTPFlow): # facebook if 'graphql' in flow.request.path and 'CometNewsFeed_viewer' in flow.response.text: ctx.log.info('received facebook feed response') flow.response.text = '' # reddit if 'gql.reddit.com' in flow.request.url: ctx.log.info('received reddit feed response') flow.response.text = '' addons = [ FeedKiller() ]",
    name: "breakwater"
}, {
    name: "dumper",
    python: "import itertools import shutil from typing import IO, Optional, Union import click from mitmproxy import contentviews from mitmproxy import ctx from mitmproxy import exceptions from mitmproxy import flowfilter from mitmproxy import http from mitmproxy import flow from mitmproxy.tcp import TCPFlow, TCPMessage from mitmproxy.utils import human from mitmproxy.utils import strutils from mitmproxy.websocket import WebSocketMessage, WebSocketData from wsproto.frame_protocol import CloseReason def indent(n: int, text: str) -> str: l = str(text).strip().splitlines() pad = \" \" * n return \"\\n\".join(pad + i for i in l) def colorful(line, styles): yield \" \" # we can already indent here for (style, text) in line: yield click.style(text, **styles.get(style, {})) class Dumper: def __init__(self, outfile=None): self.filter: Optional[flowfilter.TFilter] = None self.outfp: Optional[IO] = outfile def load(self, loader): loader.add_option( \"flow_detail\", int, 1, \"\"\" The display detail level for flows in mitmdump: 0 (quiet) to 4 (very verbose). 0: no output 1: shortened request URL with response status code 2: full request URL with response status code and HTTP headers 3: 2 + truncated response content, content of WebSocket and TCP messages 4: 3 + nothing is truncated \"\"\" ) loader.add_option( \"dumper_default_contentview\", str, \"auto\", \"The default content view mode.\", choices=[i.name.lower() for i in contentviews.views] ) loader.add_option( \"dumper_filter\", Optional[str], None, \"Limit which flows are dumped.\" ) def configure(self, updated): if \"dumper_filter\" in updated: if ctx.options.dumper_filter: try: self.filter = flowfilter.parse(ctx.options.dumper_filter) except ValueError as e: raise exceptions.OptionsError(str(e)) from e else: self.filter = None def echo(self, text: str, ident=None, **style): if ident: text = indent(ident, text) click.secho(text, file=self.outfp, err=False, **style) if self.outfp: self.outfp.flush() def _echo_headers(self, headers: http.Headers): for k, v in headers.fields: ks = strutils.bytes_to_escaped_str(k) vs = strutils.bytes_to_escaped_str(v) out = \"{}: {}\".format( click.style(ks, fg=\"blue\"), click.style(vs) ) self.echo(out, ident=4) def _echo_trailers(self, trailers: Optional[http.Headers]): if not trailers: return self.echo(click.style(\"--- HTTP Trailers\", fg=\"magenta\"), ident=4) self._echo_headers(trailers) def _echo_message( self, message: Union[http.Message, TCPMessage, WebSocketMessage], flow: Union[http.HTTPFlow, TCPFlow] ): _, lines, error = contentviews.get_message_content_view( ctx.options.dumper_default_contentview, message, flow ) if error: ctx.log.debug(error) if ctx.options.flow_detail == 3: lines_to_echo = itertools.islice(lines, 70) else: lines_to_echo = lines styles = dict( highlight=dict(bold=True), offset=dict(fg=\"blue\"), header=dict(fg=\"green\", bold=True), text=dict(fg=\"green\") ) content = \"\\r\\n\".join( \"\".join(colorful(line, styles)) for line in lines_to_echo ) if content: self.echo(\"\") self.echo(content) if next(lines, None): self.echo(\"(cut off)\", ident=4, dim=True) if ctx.options.flow_detail >= 2: self.echo(\"\") def _echo_request_line(self, flow: http.HTTPFlow) -> None: if flow.is_replay == \"request\": client = click.style(\"[replay]\", fg=\"yellow\", bold=True) elif flow.client_conn.peername: client = click.style( strutils.escape_control_characters( human.format_address(flow.client_conn.peername) ) ) else: # pragma: no cover # this should not happen, but we're defensive here. client = \"\" pushed = ' PUSH_PROMISE' if 'h2-pushed-stream' in flow.metadata else '' method = flow.request.method + pushed method_color = dict( GET=\"green\", DELETE=\"red\" ).get(method.upper(), \"magenta\") method = click.style( strutils.escape_control_characters(method), fg=method_color, bold=True ) if ctx.options.showhost: url = flow.request.pretty_url else: url = flow.request.url if ctx.options.flow_detail == 1: # We need to truncate before applying styles, so we just focus on the URL. terminal_width_limit = max(shutil.get_terminal_size()[0] - 25, 50) if len(url) > terminal_width_limit: url = url[:terminal_width_limit] + \"\u2026\" url = click.style(strutils.escape_control_characters(url), bold=True) http_version = \"\" if ( not (flow.request.is_http10 or flow.request.is_http11) or flow.request.http_version != getattr(flow.response, \"http_version\", \"HTTP/1.1\") ): # Hide version for h1 <-> h1 connections. http_version = \" \" + flow.request.http_version self.echo(f\"{client}: {method} {url}{http_version}\") def _echo_response_line(self, flow: http.HTTPFlow) -> None: if flow.is_replay == \"response\": replay_str = \"[replay]\" replay = click.style(replay_str, fg=\"yellow\", bold=True) else: replay_str = \"\" replay = \"\" assert flow.response code_int = flow.response.status_code code_color = None if 200 <= code_int < 300: code_color = \"green\" elif 300 <= code_int < 400: code_color = \"magenta\" elif 400 <= code_int < 600: code_color = \"red\" code = click.style( str(code_int), fg=code_color, bold=True, blink=(code_int == 418), ) if not flow.response.is_http2: reason = flow.response.reason else: reason = http.status_codes.RESPONSES.get(flow.response.status_code, \"\") reason = click.style( strutils.escape_control_characters(reason), fg=code_color, bold=True ) if flow.response.raw_content is None: size = \"(content missing)\" else: size = human.pretty_size(len(flow.response.raw_content)) size = click.style(size, bold=True) http_version = \"\" if ( not (flow.response.is_http10 or flow.response.is_http11) or flow.request.http_version != flow.response.http_version ): # Hide version for h1 <-> h1 connections. http_version = f\"{flow.response.http_version} \" arrows = click.style(\" <<\", bold=True) if ctx.options.flow_detail == 1: # This aligns the HTTP response code with the HTTP request method: # 127.0.0.1:59519: GET http://example.com/ # << 304 Not Modified 0b pad = max(0, len(human.format_address(flow.client_conn.peername)) - (2 + len(http_version) + len(replay_str))) arrows = \" \" * pad + arrows self.echo(f\"{replay}{arrows} {http_version}{code} {reason} {size}\") def echo_flow(self, f: http.HTTPFlow) -> None: if f.request: self._echo_request_line(f) if ctx.options.flow_detail >= 2: self._echo_headers(f.request.headers) if ctx.options.flow_detail >= 3: self._echo_message(f.request, f) if ctx.options.flow_detail >= 2: self._echo_trailers(f.request.trailers) if f.response: self._echo_response_line(f) if ctx.options.flow_detail >= 2: self._echo_headers(f.response.headers) if ctx.options.flow_detail >= 3: self._echo_message(f.response, f) if ctx.options.flow_detail >= 2: self._echo_trailers(f.response.trailers) if f.error: msg = strutils.escape_control_characters(f.error.msg) self.echo(f\" << {msg}\", bold=True, fg=\"red\") def match(self, f): if ctx.options.flow_detail == 0: return False if not self.filter: return True elif flowfilter.match(self.filter, f): return True return False def response(self, f): if self.match(f): self.echo_flow(f) def error(self, f): if self.match(f): self.echo_flow(f) def websocket_message(self, f: http.HTTPFlow): assert f.websocket is not None # satisfy type checker if self.match(f): message = f.websocket.messages[-1] direction = \"->\" if message.from_client else \"<-\" self.echo( f\"{human.format_address(f.client_conn.peername)} \" f\"{direction} WebSocket {message.type.name.lower()} message \" f\"{direction} {human.format_address(f.server_conn.address)}{f.request.path}\" ) if ctx.options.flow_detail >= 3: self._echo_message(message, f) def websocket_end(self, f: http.HTTPFlow): assert f.websocket is not None # satisfy type checker if self.match(f): if f.websocket.close_code in {1000, 1001, 1005}: c = 'client' if f.websocket.closed_by_client else 'server' self.echo(f\"WebSocket connection closed by {c}: {f.websocket.close_code} {f.websocket.close_reason}\") else: error = flow.Error(f\"WebSocket Error: {self.format_websocket_error(f.websocket)}\") self.echo( f\"Error in WebSocket connection to {human.format_address(f.server_conn.address)}: {error}\", fg=\"red\" ) def format_websocket_error(self, websocket: WebSocketData) -> str: try: ret = CloseReason(websocket.close_code).name except ValueError: ret = f\"UNKNOWN_ERROR={websocket.close_code}\" if websocket.close_reason: ret += f\" (reason: {websocket.close_reason})\" return ret def tcp_error(self, f): if self.match(f): self.echo( f\"Error in TCP connection to {human.format_address(f.server_conn.address)}: {f.error}\", fg=\"red\" ) def tcp_message(self, f): if self.match(f): message = f.messages[-1] direction = \"->\" if message.from_client else \"<-\" self.echo(\"{client} {direction} tcp {direction} {server}\".format( client=human.format_address(f.client_conn.peername), server=human.format_address(f.server_conn.address), direction=direction, )) if ctx.options.flow_detail >= 3: self._echo_message(message, f)"
}, {
    python: "\"\"\" The View: - Keeps track of a store of flows - Maintains a filtered, ordered view onto that list of flows - Exposes a number of signals so the view can be monitored - Tracks focus within the view - Exposes a settings store for flows that automatically expires if the flow is removed from the store. \"\"\" import collections import re import typing import blinker import sortedcontainers import mitmproxy.flow from mitmproxy import command from mitmproxy import ctx from mitmproxy import exceptions from mitmproxy import hooks from mitmproxy import connection from mitmproxy import flowfilter from mitmproxy import http from mitmproxy import io from mitmproxy import tcp from mitmproxy.utils import human # The underlying sorted list implementation expects the sort key to be stable # for the lifetime of the object. However, if we sort by size, for instance, # the sort order changes as the flow progresses through its lifecycle. We # address this through two means: # # - Let order keys cache the sort value by flow ID. # # - Add a facility to refresh items in the list by removing and re-adding them # when they are updated. class _OrderKey: def __init__(self, view): self.view = view def generate(self, f: mitmproxy.flow.Flow) -> typing.Any: # pragma: no cover pass def refresh(self, f): k = self._key() old = self.view.settings[f][k] new = self.generate(f) if old != new: self.view._view.remove(f) self.view.settings[f][k] = new self.view._view.add(f) self.view.sig_view_refresh.send(self.view) def _key(self): return \"_order_%s\" % id(self) def __call__(self, f): if f.id in self.view._store: k = self._key() s = self.view.settings[f] if k in s: return s[k] val = self.generate(f) s[k] = val return val else: return self.generate(f) class OrderRequestStart(_OrderKey): def generate(self, f: mitmproxy.flow.Flow) -> float: return f.timestamp_start class OrderRequestMethod(_OrderKey): def generate(self, f: mitmproxy.flow.Flow) -> str: if isinstance(f, http.HTTPFlow): return f.request.method elif isinstance(f, tcp.TCPFlow): return \"TCP\" else: raise NotImplementedError() class OrderRequestURL(_OrderKey): def generate(self, f: mitmproxy.flow.Flow) -> str: if isinstance(f, http.HTTPFlow): return f.request.url elif isinstance(f, tcp.TCPFlow): return human.format_address(f.server_conn.address) else: raise NotImplementedError() class OrderKeySize(_OrderKey): def generate(self, f: mitmproxy.flow.Flow) -> int: if isinstance(f, http.HTTPFlow): size = 0 if f.request.raw_content: size += len(f.request.raw_content) if f.response and f.response.raw_content: size += len(f.response.raw_content) return size elif isinstance(f, tcp.TCPFlow): size = 0 for message in f.messages: size += len(message.content) return size else: raise NotImplementedError() orders = [ (\"t\", \"time\"), (\"m\", \"method\"), (\"u\", \"url\"), (\"z\", \"size\"), ] class View(collections.abc.Sequence): def __init__(self): super().__init__() self._store = collections.OrderedDict() self.filter = flowfilter.match_all # Should we show only marked flows? self.show_marked = False self.default_order = OrderRequestStart(self) self.orders = dict( time=OrderRequestStart(self), method=OrderRequestMethod(self), url=OrderRequestURL(self), size=OrderKeySize(self), ) self.order_key = self.default_order self.order_reversed = False self.focus_follow = False self._view = sortedcontainers.SortedListWithKey( key=self.order_key ) # The sig_view* signals broadcast events that affect the view. That is, # an update to a flow in the store but not in the view does not trigger # a signal. All signals are called after the view has been updated. self.sig_view_update = blinker.Signal() self.sig_view_add = blinker.Signal() self.sig_view_remove = blinker.Signal() # Signals that the view should be refreshed completely self.sig_view_refresh = blinker.Signal() # The sig_store* signals broadcast events that affect the underlying # store. If a flow is removed from just the view, sig_view_remove is # triggered. If it is removed from the store while it is also in the # view, both sig_store_remove and sig_view_remove are triggered. self.sig_store_remove = blinker.Signal() # Signals that the store should be refreshed completely self.sig_store_refresh = blinker.Signal() self.focus = Focus(self) self.settings = Settings(self) def load(self, loader): loader.add_option( \"view_filter\", typing.Optional[str], None, \"Limit the view to matching flows.\" ) loader.add_option( \"view_order\", str, \"time\", \"Flow sort order.\", choices=list(map(lambda c: c[1], orders)), ) loader.add_option( \"view_order_reversed\", bool, False, \"Reverse the sorting order.\" ) loader.add_option( \"console_focus_follow\", bool, False, \"Focus follows new flows.\" ) def store_count(self): return len(self._store) def _rev(self, idx: int) -> int: \"\"\" Reverses an index, if needed \"\"\" if self.order_reversed: if idx < 0: idx = -idx - 1 else: idx = len(self._view) - idx - 1 if idx < 0: raise IndexError return idx def __len__(self): return len(self._view) def __getitem__(self, offset) -> typing.Any: return self._view[self._rev(offset)] # Reflect some methods to the efficient underlying implementation def _bisect(self, f: mitmproxy.flow.Flow) -> int: v = self._view.bisect_right(f) return self._rev(v - 1) + 1 def index(self, f: mitmproxy.flow.Flow, start: int = 0, stop: typing.Optional[int] = None) -> int: return self._rev(self._view.index(f, start, stop)) def __contains__(self, f: typing.Any) -> bool: return self._view.__contains__(f) def _order_key_name(self): return \"_order_%s\" % id(self.order_key) def _base_add(self, f): self.settings[f][self._order_key_name()] = self.order_key(f) self._view.add(f) def _refilter(self): self._view.clear() for i in self._store.values(): if self.show_marked and not i.marked: continue if self.filter(i): self._base_add(i) self.sig_view_refresh.send(self) \"\"\" View API \"\"\" # Focus @command.command(\"view.focus.go\") def go(self, offset: int) -> None: \"\"\" Go to a specified offset. Positive offests are from the beginning of the view, negative from the end of the view, so that 0 is the first flow, -1 is the last flow. \"\"\" if len(self) == 0: return if offset < 0: offset = len(self) + offset if offset < 0: offset = 0 if offset > len(self) - 1: offset = len(self) - 1 self.focus.flow = self[offset] @command.command(\"view.focus.next\") def focus_next(self) -> None: \"\"\" Set focus to the next flow. \"\"\" if self.focus.index is not None: idx = self.focus.index + 1 if self.inbounds(idx): self.focus.flow = self[idx] else: pass @command.command(\"view.focus.prev\") def focus_prev(self) -> None: \"\"\" Set focus to the previous flow. \"\"\" if self.focus.index is not None: idx = self.focus.index - 1 if self.inbounds(idx): self.focus.flow = self[idx] else: pass # Order @command.command(\"view.order.options\") def order_options(self) -> typing.Sequence[str]: \"\"\" Choices supported by the view_order option. \"\"\" return list(sorted(self.orders.keys())) @command.command(\"view.order.reverse\") def set_reversed(self, boolean: bool) -> None: self.order_reversed = boolean self.sig_view_refresh.send(self) @command.command(\"view.order.set\") def set_order(self, order_key: str) -> None: \"\"\" Sets the current view order. \"\"\" if order_key not in self.orders: raise exceptions.CommandError( \"Unknown flow order: %s\" % order_key ) order_key = self.orders[order_key] self.order_key = order_key newview = sortedcontainers.SortedListWithKey(key=order_key) newview.update(self._view) self._view = newview @command.command(\"view.order\") def get_order(self) -> str: \"\"\" Returns the current view order. \"\"\" order = \"\" for k in self.orders.keys(): if self.order_key == self.orders[k]: order = k return order # Filter @command.command(\"view.filter.set\") def set_filter_cmd(self, filter_expr: str) -> None: \"\"\" Sets the current view filter. \"\"\" filt = None if filter_expr: try: filt = flowfilter.parse(filter_expr) except ValueError as e: raise exceptions.CommandError(str(e)) from e self.set_filter(filt) def set_filter(self, flt: typing.Optional[flowfilter.TFilter]): self.filter = flt or flowfilter.match_all self._refilter() # View Updates @command.command(\"view.clear\") def clear(self) -> None: \"\"\" Clears both the store and view. \"\"\" self._store.clear() self._view.clear() self.sig_view_refresh.send(self) self.sig_store_refresh.send(self) @command.command(\"view.clear_unmarked\") def clear_not_marked(self) -> None: \"\"\" Clears only the unmarked flows. \"\"\" for flow in self._store.copy().values(): if not flow.marked: self._store.pop(flow.id) self._refilter() self.sig_store_refresh.send(self) # View Settings @command.command(\"view.settings.getval\") def getvalue(self, flow: mitmproxy.flow.Flow, key: str, default: str) -> str: \"\"\" Get a value from the settings store for the specified flow. \"\"\" return self.settings[flow].get(key, default) @command.command(\"view.settings.setval.toggle\") def setvalue_toggle( self, flows: typing.Sequence[mitmproxy.flow.Flow], key: str ) -> None: \"\"\" Toggle a boolean value in the settings store, setting the value to the string \"true\" or \"false\". \"\"\" updated = [] for f in flows: current = self.settings[f].get(\"key\", \"false\") self.settings[f][key] = \"false\" if current == \"true\" else \"true\" updated.append(f) ctx.master.addons.trigger(hooks.UpdateHook(updated)) @command.command(\"view.settings.setval\") def setvalue( self, flows: typing.Sequence[mitmproxy.flow.Flow], key: str, value: str ) -> None: \"\"\" Set a value in the settings store for the specified flows. \"\"\" updated = [] for f in flows: self.settings[f][key] = value updated.append(f) ctx.master.addons.trigger(hooks.UpdateHook(updated)) # Flows @command.command(\"view.flows.duplicate\") def duplicate(self, flows: typing.Sequence[mitmproxy.flow.Flow]) -> None: \"\"\" Duplicates the specified flows, and sets the focus to the first duplicate. \"\"\" dups = [f.copy() for f in flows] if dups: self.add(dups) self.focus.flow = dups[0] ctx.log.alert(\"Duplicated %s flows\" % len(dups)) @command.command(\"view.flows.remove\") def remove(self, flows: typing.Sequence[mitmproxy.flow.Flow]) -> None: \"\"\" Removes the flow from the underlying store and the view. \"\"\" for f in flows: if f.id in self._store: if f.killable: f.kill() if f in self._view: # We manually pass the index here because multiple flows may have the same # sorting key, and we cannot reconstruct the index from that. idx = self._view.index(f) self._view.remove(f) self.sig_view_remove.send(self, flow=f, index=idx) del self._store[f.id] self.sig_store_remove.send(self, flow=f) if len(flows) > 1: ctx.log.alert(\"Removed %s flows\" % len(flows)) @command.command(\"view.flows.resolve\") def resolve(self, flow_spec: str) -> typing.Sequence[mitmproxy.flow.Flow]: \"\"\" Resolve a flow list specification to an actual list of flows. \"\"\" if flow_spec == \"@all\": return [i for i in self._store.values()] if flow_spec == \"@focus\": return [self.focus.flow] if self.focus.flow else [] elif flow_spec == \"@shown\": return [i for i in self] elif flow_spec == \"@hidden\": return [i for i in self._store.values() if i not in self._view] elif flow_spec == \"@marked\": return [i for i in self._store.values() if i.marked] elif flow_spec == \"@unmarked\": return [i for i in self._store.values() if not i.marked] elif re.match(r\"@[0-9a-f\\-,]{36,}\", flow_spec): ids = flow_spec[1:].split(\",\") return [i for i in self._store.values() if i.id in ids] else: try: filt = flowfilter.parse(flow_spec) except ValueError as e: raise exceptions.CommandError(str(e)) from e return [i for i in self._store.values() if filt(i)] @command.command(\"view.flows.create\") def create(self, method: str, url: str) -> None: try: req = http.Request.make(method.upper(), url) except ValueError as e: raise exceptions.CommandError(\"Invalid URL: %s\" % e) c = connection.Client((\"\", 0), (\"\", 0), req.timestamp_start - 0.0001) s = connection.Server((req.host, req.port)) f = http.HTTPFlow(c, s) f.request = req f.request.headers[\"Host\"] = req.host self.add([f]) @command.command(\"view.flows.load\") def load_file(self, path: mitmproxy.types.Path) -> None: \"\"\" Load flows into the view, without processing them with addons. \"\"\" try: with open(path, \"rb\") as f: for i in io.FlowReader(f).stream(): # Do this to get a new ID, so we can load the same file N times and # get new flows each time. It would be more efficient to just have a # .newid() method or something. self.add([i.copy()]) except OSError as e: ctx.log.error(e.strerror) except exceptions.FlowReadException as e: ctx.log.error(str(e)) def add(self, flows: typing.Sequence[mitmproxy.flow.Flow]) -> None: \"\"\" Adds a flow to the state. If the flow already exists, it is ignored. \"\"\" for f in flows: if f.id not in self._store: self._store[f.id] = f if self.filter(f): self._base_add(f) if self.focus_follow: self.focus.flow = f self.sig_view_add.send(self, flow=f) def get_by_id(self, flow_id: str) -> typing.Optional[mitmproxy.flow.Flow]: \"\"\" Get flow with the given id from the store. Returns None if the flow is not found. \"\"\" return self._store.get(flow_id) # View Properties @command.command(\"view.properties.length\") def get_length(self) -> int: \"\"\" Returns view length. \"\"\" return len(self) @command.command(\"view.properties.marked\") def get_marked(self) -> bool: \"\"\" Returns true if view is in marked mode. \"\"\" return self.show_marked @command.command(\"view.properties.marked.toggle\") def toggle_marked(self) -> None: \"\"\" Toggle whether to show marked views only. \"\"\" self.show_marked = not self.show_marked self._refilter() @command.command(\"view.properties.inbounds\") def inbounds(self, index: int) -> bool: \"\"\" Is this 0 <= index < len(self)? \"\"\" return 0 <= index < len(self) # Event handlers def configure(self, updated): if \"view_filter\" in updated: filt = None if ctx.options.view_filter: try: filt = flowfilter.parse(ctx.options.view_filter) except ValueError as e: raise exceptions.OptionsError(str(e)) from e self.set_filter(filt) if \"view_order\" in updated: if ctx.options.view_order not in self.orders: raise exceptions.OptionsError( \"Unknown flow order: %s\" % ctx.options.view_order ) self.set_order(ctx.options.view_order) if \"view_order_reversed\" in updated: self.set_reversed(ctx.options.view_order_reversed) if \"console_focus_follow\" in updated: self.focus_follow = ctx.options.console_focus_follow def requestheaders(self, f): self.add([f]) def error(self, f): self.update([f]) def response(self, f): self.update([f]) def intercept(self, f): self.update([f]) def resume(self, f): self.update([f]) def kill(self, f): self.update([f]) def tcp_start(self, f): self.add([f]) def tcp_message(self, f): self.update([f]) def tcp_error(self, f): self.update([f]) def tcp_end(self, f): self.update([f]) def update(self, flows: typing.Sequence[mitmproxy.flow.Flow]) -> None: \"\"\" Updates a list of flows. If flow is not in the state, it's ignored. \"\"\" for f in flows: if f.id in self._store: if self.filter(f): if f not in self._view: self._base_add(f) if self.focus_follow: self.focus.flow = f self.sig_view_add.send(self, flow=f) else: # This is a tad complicated. The sortedcontainers # implementation assumes that the order key is stable. If # it changes mid-way Very Bad Things happen. We detect when # this happens, and re-fresh the item. self.order_key.refresh(f) self.sig_view_update.send(self, flow=f) else: try: idx = self._view.index(f) except ValueError: pass # The value was not in the view else: self._view.remove(f) self.sig_view_remove.send(self, flow=f, index=idx) class Focus: \"\"\" Tracks a focus element within a View. \"\"\" def __init__(self, v: View) -> None: self.view = v self._flow: typing.Optional[mitmproxy.flow.Flow] = None self.sig_change = blinker.Signal() if len(self.view): self.flow = self.view[0] v.sig_view_add.connect(self._sig_view_add) v.sig_view_remove.connect(self._sig_view_remove) v.sig_view_refresh.connect(self._sig_view_refresh) @property def flow(self) -> typing.Optional[mitmproxy.flow.Flow]: return self._flow @flow.setter def flow(self, f: typing.Optional[mitmproxy.flow.Flow]): if f is not None and f not in self.view: raise ValueError(\"Attempt to set focus to flow not in view\") self._flow = f self.sig_change.send(self) @property def index(self) -> typing.Optional[int]: if self.flow: return self.view.index(self.flow) return None @index.setter def index(self, idx): if idx < 0 or idx > len(self.view) - 1: raise ValueError(\"Index out of view bounds\") self.flow = self.view[idx] def _nearest(self, f, v): return min(v._bisect(f), len(v) - 1) def _sig_view_remove(self, view, flow, index): if len(view) == 0: self.flow = None elif flow is self.flow: self.index = min(index, len(self.view) - 1) def _sig_view_refresh(self, view): if len(view) == 0: self.flow = None elif self.flow is None: self.flow = view[0] elif self.flow not in view: self.flow = view[self._nearest(self.flow, view)] def _sig_view_add(self, view, flow): # We only have to act if we don't have a focus element if not self.flow: self.flow = flow class Settings(collections.abc.Mapping): def __init__(self, view: View) -> None: self.view = view self._values: typing.MutableMapping[str, typing.Dict] = {} view.sig_store_remove.connect(self._sig_store_remove) view.sig_store_refresh.connect(self._sig_store_refresh) def __iter__(self) -> typing.Iterator: return iter(self._values) def __len__(self) -> int: return len(self._values) def __getitem__(self, f: mitmproxy.flow.Flow) -> dict: if f.id not in self.view._store: raise KeyError return self._values.setdefault(f.id, {}) def _sig_store_remove(self, view, flow): if flow.id in self._values: del self._values[flow.id] def _sig_store_refresh(self, view): for fid in list(self._values.keys()): if fid not in view._store: del self._values[fid]",
    name: "image_limiter"
}]


// function App() {
//     return React.createElement(FilterableProductTable, {products: PRODUCTS});
// }

function App() {
    return React.createElement(Control, {apps:APPS});
}
