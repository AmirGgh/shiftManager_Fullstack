import MoviesManager from "../assets/projects/movtv.png";
import ShiftManager from "../assets/projects/shiftManager.jpg";
import StoreManager from "../assets/projects/storeManager.jpg";
import storeManagerVideo from '../assets/projects/storeManagerVideo.mp4'

export const data = [
  {
    id: 1,
    name: "Fullstack - Movies Application",
    image: MoviesManager,
    summary:
      "Full Stack developer - development of a subscription and movie management system -" +
      "A web application based on two Rest API servers and a client side in React.js. The architecture of the system was divided according to Business and Data layers" +
      "Server side: The servers were developed using express and node. All calls between the servers are made using Rest calls based on CRUD. The servers manage databases realized by mongoDB and the modeling of the objects was done with the help of Mongoose. The routers on the servers were realized and secured by using jwt with express." +
      "Client side: developed in React.js and Redux, the design is implemented using Material. The distribution of permissions in the application allows only existing users to perform actions according to the limitations defined for them.",
    github: "https://github.com/AmirGgh/Cinima_Clube",
    live: "",
  },
  {
    id: 2,
    name: "FullStack with graphQL - Shift Manager ",
    image: ShiftManager,
    summary:
      "Developed with GraphQL Apollo Server. All calls on the server are made using GraphQL calls. The server manages databases realized by MongoDB and the modeling of the objects was carried out with Mongoose. In addition, the server works with a JSON fileof permissions for users with the aid of two layers of Biasness and Data. The application secured by using JWT." +
      "The client developed in React.js and Apollo client linked to the GraphQL server. The distribution of permissions in the application allows only existing users to perform actions according to the limitations de ned for them.",
    github: "https://github.com/AmirGgh/shiftManager_Fullstack",
    live: "",
  },
  {
    id: 3,
    name: "React Application - Store Manager",
    image: StoreManager,
    video: storeManagerVideo,
    summary:
      "Develop with Firebase that manages all the data and requests (CRUD) from the client side. The client developed with React.js with MaterialUI, And appears as a shop to non-customers and customers. Customers can purchase products. The admin can edit products and customers for him the site appears as a manager site with a dashboard of all the data.",
    live: "https://amirggh.github.io/storeManager",
    github: "https://github.com/AmirGgh/storeManager",
  },
];
