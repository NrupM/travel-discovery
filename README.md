# Travel Discovery

A React app that displays travel destinations which can be filtered by user input.

It follows a component based design, made up of 3 main components. All configuration settings are included in a config folder, including a text object for text constants for easy maintanance and reusability. Necessary checks on objects existance performed.

> The api's provided in the prompt were no longer available - as a solution, I ended up using the same service to create my own:
> `https://demo6760479.mockable.io/marys-awesome-api`

## Installation & Running the app locally

1. Clone the repo

```sh
git clone https://github.com/NrupM/travel-discovery.git

```

2. Install NPM packages

```sh
npm install
```

3. Run the app in development

```sh
npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## What I would have done given more time:

- **CSS**: remove `Bootstrap` and have a `Sass` file or use a style system like `styled-components` to better organize and be consistent with my component design approach. Also, would like to design and use my own `Carousel` and remove the third party library.

- **Testing**: Write unit and integration tests.

- **Error handling**: have a user friendly way of displaying errors.

- **Browser compatability & Accessibility**

- **See if service workers would improve performance**

- **Create a Utils object**: Would like to move `transformResponseToArray()` into a utils object.

- **Deployed**

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment
