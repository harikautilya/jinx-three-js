# SSH 
This repo copies you existing configuration to the dev container to ensure that you are able to use git while running dev container. 
But the permission seems to be problem with respect to file.
Change the permission of the dir and file as per you needs
This needs to run everytime you build your dev container
Will think of post script

```
chmod 700 /root/.ssh
chmod 600 /root/.ssh/config
chmod 600 /root/.ssh/<your key>
```

# Resources

npm workspaces :  https://docs.npmjs.com/cli/v7/using-npm/workspaces
turbo : https://turbo.build/repo/docs/getting-started/add-to-existing-repository