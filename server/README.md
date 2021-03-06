**Using Docker**
 
**Steps to run the project**

Clone the project:

```sh
    git clone https://github.com/sinner/express-test
```

or

```sh
    git clone git@github.com:sinner/express-test.git
```

```sh
    cd express-test
```

Being in the root directory of the project:

- 1.- Open your linux terminal and locate on the root project directory. Then we have to install docker.

```sh
    sudo curl -sSL https://get.docker.com/ | sh
```

- 2.- Add your user to docker group for having the proper permissions.

```sh
    sudo usermod -aG docker `whoami`
    sudo usermod -aG docker ${USER}
```

- 3.- Then we need to install docker-compose.

```sh
    sudo curl -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- 4.- You need to make sure that you have the proper permissions to execute docker with your normal user (no root user). After doing that, you should be able to run the command without any issues. Run 'docker ps' then you should see the list of the docker process as a normal user in order to check if it works:

```sh 
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                          PORTS                                  NAMES
    ba58f5269b65        docker_app          "npm start"              11 minutes ago      Up 11 minutes                                                          express-test-app
    fd560e114e53        mongo:latest        "docker-entrypoint..."   11 minutes ago      Up 11 minutes                   0.0.0.0:27017-27018->27017-27018/tcp   mongodb-test-app
```

If you can't run this command obtaining the correct response reboot if the issue still persists and return after this step. 

- 5.- Execute the following command:

```sh
    docker-compose up -d
```

If something is not going well execute the following commands:

```sh
    docker-compose down
```

```sh
    docker-compose up -d
```

- 6.- Enter to the dockerized application server:

```sh
     docker exec -it express-test-app bash
```

- 7.- You need to make sure that we have installed nodemon and the local libraries, they should be already installed but if don't, you could execute these commands being the docker app server: 

```sh
     npm install
```

```sh
    npm install -g nodemon
```

- 7.- Run the application:

```sh
     npm start
```

- 8.- Open your browser on [http://localhost:13000/](http://localhost:13000/)