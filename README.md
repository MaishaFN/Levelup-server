# [LevelUp](https://levup.netlify.app/)

![LevelUp](https://github.com/JesusR-91/Levelup-client/blob/main/src/assets/logo.png?raw=true)

## Description:
Social network with a gamer theme, in which apart from being able to interact with other users directly or in groups, you can inspect any game in the database.

### User Stories:

- 404: I've no memories of this place.
- 500: It's a trap
- Login: In this window you have the option to register or log in.
- Sign up: Here you have the fields to register or if you are already registered you have a link to the login page.
- Home: In addition to the navigation bar at the top, there is a search bar to find users and a form to create new comments and a button that turns off/on lights.
- Profile: This area shows your profile picture, name, e-mail, phone, the comments that you and your friends had post and a button to edit your user
- Edit Profile: When editing your user you have options to edit the above mentioned fields.
- Group List: 2 lists of groups, the ones you have created and others in which you are invited. The name of the group and the users, plus a button to create more groups
- Group details: You have the details of the respective group as well as the users which you can delete or make them moderators, the description and the comments they have posted. There is also a button to add new users.And like, dislike and love buttons
- Game List: In the video games section there is a list with different games which show different information about the game, there is a search bar.
- Game Details: En los detalles hay un desplegable con la información y un link que te lleva a la pagina del juego. Mas abajo hay un boton para añadir valoraciones.
- Admin: On this page you can delete both users and groups.

### Backlog Functionalities
We wanted to have implemented a more optimised gamesearch engine as right now you have to put the exact name and also connect it with an API that allows that when a comment is posted to X user an email is sent to the members in the group.


### Technologies Used
- React
- JavaScript
- HTML
- BootsTrap
- CSS
- Api: Rawg.io
- Cloudinary
- MongoDB
    - Mongoose
- Express
- NodeJS
- Adaptable
- Netlify
- GitHub
- Postman

### Models
 ## Group:
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mods: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    publicationsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Publications",
      },
    ],
 ## GroupComment:
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    loves: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },

 ## Valuation
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      max: 5,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    loves: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },


 ## Publication
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    loves: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  


 ## User
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNum: {
      type: Number,
      minLength: 9,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rol: 
      {
        type: [String],
        enum: ["user", "admin"],
        default: "user",
      },   
 



# Links

[Jesús Ruiz](https://github.com/JesusR-91)
[![LinkedIn](https://github.com/JesusR-91/Proyect-2/blob/main/public/images/linkedin%20(1).png?raw=true)](https://www.linkedin.com/in/jes%C3%BAs-manuel-ruiz-ja%C3%A9n-24714472/)
[Maisha Fumanal Navarro](https://github.com/MaishaFN)
[![LinkedIn](https://github.com/JesusR-91/Proyect-2/blob/main/public/images/linkedin%20(1).png?raw=true)](https://www.linkedin.com/in/maishafn/)
