# CM4025_Enterprise-Web-Development_Coursework

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
         <li><a href="Application-context">Application context</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is the course work submition of Sam McRuvie (150933) [email](s.aj.mcruvie@gmail.com) for CM4024 Enterprise Web Development.

### Application context 
A coffee roasting/selling e-comers website. That displays the company’s (“Coffee house roastery”) products. 
Users can not order directly form the site but can view the range of products! This app tracks product views and 
user demographics of views on products on products



### Built With

* [React](https://reactjs.org)
* [Express](https://expressjs.com)
* [material-ui](https://material-ui.com)


<!-- GETTING STARTED -->
## Getting Started

This guide shows you how to install and run the development version of the CM4025_Enterprise-Web-Development_Coursework project

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MadLadMadara/CM4025_Enterprise-Web-Development_Coursework.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `config.js`
   ```sh
   PORT=<your_port> JWT_SECRET="<your_secret>" MONGODB_URI="<your_mongo_db_URL>" npm run-script development
   ```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.
