# Shift Manager For Factory
A fullstack application create with MongoDB, Node.js, Apollo GraphQL (service &amp; client),JWT and React

## Main Points:
- The Factory has employees
- Each employee belongs to a department
- Each department have no more then one manager
- Each employee works several shifts.
- Each shift compose from employees
- ONLY registered users can work (log in to) with the web site. 
the users come from web servise -> username and emails(as password) in the end of this file.

##Installetions
server: in server file run 'npm i' to install all the pacages. then run 'npm start' to start the server at 'http://localhost:4000' 

## Architecture
### Server:
The server is developed by using GraphQL Apollo Server. All calls on the server are made using GraphQL calls. The server manages databases realized by MongoDB and the modeling of the objects was carried out with Mongoose. In addition, the server works with a JSON file of permissions for users with the aid of two layers of Biasness and Data. The use of the application secured by using jwt.

### Client:
developed in React.js and Apollo client linked to the GraphQL server. The distribution of permissions in the application allows only existing users to perform actions according to the limitations defined for them.

## Log in
- In the first log in you got 50 actions that you can do after passing this limit you will log out and able to return to the site next day.
- You should have at least one employee that connected to your user, Only then you get access to the ather pages.
- If there are no departments created by you or other users choose "demo department". This will set you 50 actions at each login until you are linked to another department with the help of the first employee you define.
- The number of your actions are determined by the last department where you created an employee, if all employees have been deleted, the number of possible actions will not change.

## Pages
### employees
- display all the employees in the factory, thire department and all thire shifts.
- This page allowd you to add, update , and delete employees by click on thier name.
You can add an employee to any shift that is not included, And transfer it between departments.
- You can also updat and delete department by click on them.

### departments
- display all the departments in the factory, thire menager and all thire employees.
- This page allowd you to add, update, and delete departments by click on them.
You can allocate an employee to any department that is not included.
- You can also updat and delete department by click on them.

### shifts
- display all the shifts in the factory, and all thire employees.
- This page allowd you to add, update shifts by click on them -> there you can delete, add and allocate employees.
You can allocate an employee to any department that is not included.
- You can also updat and delete department by click on them.

### users
- display all the users in the factory.
- The page shows you the max actions and actions allowd of all the users.
- Max Action will display only if the user logged in at all.

### USERS FOR LOGIN:
Bret
   Sincere@april.biz

   Antonette
   Shanna@melissa.tv

   Samantha
   Nathan@yesenia.net

   Karianne
   Julianne.OConner@kory.org

   Kamren
   Lucio_Hettinger@annie.ca

   Leopoldo_Corkery
   Karley_Dach@jasper.info

  Elwyn.Skiles
  Telly.Hoeger@billy.biz

  Maxime_Nienow
  Sherwood@rosamond.me

  Delphine
  Chaim_McDermott@dana.io


