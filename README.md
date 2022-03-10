# build 
```bash
git pull

cd backend 
docker build -t mitmapps/control-backend:latest .
docker push mitmapps/control-backend:latest
cd ..

cd frontend 
docker build -t mitmapps/control-frontend:latest .
docker push mitmapps/control-frontend:latest
cd ..

cd mitmproxy_mods
docker build -t mitmapps/mitmproxy:latest .
docker push mitmapps/mitmproxy:latest
cd..
```

# run
```bash
docker stack deploy -c control.yml control
docker service logs -f control_mitmproxy
```

# redeploy
```bash
docker stack rm control
docker stack deploy -c control.yml control
```
