# Three JS tutorial 
A mono repo to understand three js and build https://youtube.com/shorts/vCM03u49JGo?si=bO863sQ9ZyLMZ66f

# Project setup
## Dev container setup
Ensure you have the docker and vscode setup done.
Open the project in vs code and start in the dev container.

## Code
This project follows a mono repo structure where each app present in the `apps` folder is a single post for the substack.
Each app will be later converted to a micro frontend to create a single.


## Applications
The project currently holds the following

 - Camera 
    - Post: [Substack](https://open.substack.com/pub/harikautilya/p/part-1-lights-camera-action?r=27qdk7&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true)
    - Command: `npm run camera`


## Git SSH on Dev container
This repo copies your existing configuration to the dev container to ensure that you are able to use git while running dev container. 
But the permission seems to be problem with respect to file.
Change the permission of the dir and file as per you needs
This needs to run everytime you build your dev container
Will think of post script

```
chmod 700 /root/.ssh
chmod 600 /root/.ssh/config
chmod 600 /root/.ssh/<your key>
```

## Resources
- npm workspaces :  https://docs.npmjs.com/cli/v7/using-npm/workspaces
- turbo : https://turbo.build/repo/docs/getting-started/add-to-existing-repository
- leva : https://leva.pmnd.rs/
