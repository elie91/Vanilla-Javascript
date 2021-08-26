<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->


# Development Guide

## Architecture

1. **index.js** : Starting point
    1. Routing
    2. State managed with Redux
   
1. State management with Redux
    1. **store.js**: create the rootReducer, by combining all differents reducers in our app. This file also register the store middlewares. In this case, the thunk middleware, and the logger middleware if we are in dev environnement
        1. redux-thunk is a middleware that allows to create asynchronous actions, that return a function with the dispatch argument, that allows to dispatch another actions inside. Without redux-thunk, a action can only return an object. (look **redux/base/layout/layout.action.js/fetchLayoutStartAsync line 45** for example)
        
    2. **rootReducer.js**: combine all reducers in **base** folder and persist in local storage. persistence is carried out automatically in the local storage thanks to the **redux-persist** library. The **whitelist** key in the **persistConfig** object specifies wich reducers need to be persisted
    3. **base**
        1. split by scope (datagrid, layout, user)
        2. split by files
            1. **types**: dictionary of actions keys
            2. **actions**: actions signature
                1. **type**: action key
                2. **payload**: parameters sent to the action
                3. can be a dispatch function to retrieve data from API, thanks to the thunk middleware
            3. **reducer**: switch case for each action type and state managament implementation. 
            4. **utils**: for business logic
            5. **selector**: selectors are used as an abstraction layer between component and store to optimize the scope of the store.
            In this project, the selectors are memoized selectors, thanks to the [reselect](https://github.com/reduxjs/reselect) library.
            If you dont want to use reselect, you can delete this file, and get the data from the store with classic mapStateToProps function (https://react-redux.js.org/using-react-redux/connect-mapstate)

    4. in components, the **connect** function connect a component with the redux store. The connect function takes two arguments:
        1. A function that automatically takes the store as a parameter, and specifies which part of the store we want to retrieve. The convention is to name this function **mapStateToProps**, but it is not mandatory
        2. A function which automatically takes a **dispatch** function as a parameter, and which returns an object specifying the actions to which our component has access.
        The convention is to name this function **mapDispatchToProps**, but it is not mandatory
    The connect function must be called in the component export, passing it as the second argument our component itself.
    ```javascript
        export default connect(mapStateToProps, mapDispatchToProps)(App)
    ```
    The connect function will therefore inject into the **props** of our component, the values ​​specified in the mapStateToProps and mapDispatchToProps functions
    1. if multiple instances of a component (ie datagrid), create a wrapper (ie DataGridTest1) and store in local storage the component data in a array according to the instance key
1. Components
    1. in **components** folder
        1. **xyz.component.jsx** for component logic
        2. **xyz.style.js** for component style (with material UI useStyles)
1. Translations with i18n
    1. **i18n.js**
    2. translations stored in locales/en/translation.json
    3. Hook useTranslation
    4. to display a text (. are used for json arborescence)
        ```javascript
        {t('settings.value')}
        ```
    5. to switch to another language
        ```javascript
        i18n.changeLanguage(event.target.value);
        ```
1. Routing
    1. main-router.component for main routing (sidebar and topbar)
    2. nested routing can be used inside a component (ie settings.page.jsx)
1. Dummy data
    1. written in dev.utils.js
1. Env config
    1. .env not used, package **dotenv** to install


# Done / ToDo

1. Dynamic Menu
    1. (DONE) Top bar
    1. (DONE) Side bar
    1. (TODO) Multi-level menu items
    1. (DONE) Menu item location (sidebar or topbar)
    1. Hover options
    1. Menu items config
        1. (DONE) Add new item
        1. (DONE) Persistence in local storage
        1. (TODO) Persistence in database through an API
        1. (DONE) Menu item action (action implemented in switch case in layout-item.component)
1. Dynamic Theme
    1. (DONE) Light dark theme
    1. (DONE) Color management (background and font colors according to the light/dark theme)
    1. Font size management
1. Dynamic DataGrid
    1. Base component : https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/
    1. (DONE) dynamic JSON reading (ie dev.utils.js)
    1. (DONE) New, edit delete in local storage
    1. (TODO) New, edit delete in database through an API
    1. (DONE) Number of lines
    1. Filtering
        1. (DONE) Text filtering
        1. (DONE) Date filtering
        1. (DONE) Number filtering
        1. (TODO) Advanced filtering with OR conditions
    1. (DONE) Column chooser
    1. (DONE) Group
    1. Search
        1. (DONE) Text Global Search
        1. (TODO) Advanced Search
    1. (DONE) Drag and Drop
    1. (DONE) Export
    1. (TODO) Multi rows selection
    1. (TODO) Translations override


# Packages and links

1. [devexpress](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/) for dynamic DataTable
1. [Material UI](https://material-ui.com/getting-started/installation/) 
1. [simonwep/pickr](https://github.com/Simonwep/pickr) for nice colors picker. Look colors-settings.component.jsx file
1. [i18n](https://react.i18next.com/) for translations 
2. [clsx](https://www.npmjs.com/package/clsx) utility for constructing className strings conditionally
3. [file-saver](https://www.npmjs.com/package/file-saver) for DataTable export
1. [redux](https://redux.js.org/introduction/getting-started)
1. [redux-logger](https://www.npmjs.com/package/redux-logger)
1. [redux-persist](https://github.com/rt2zz/redux-persist) 
1. [redux-thunk](https://github.com/reduxjs/redux-thunk)
1. [reselect](https://github.com/reduxjs/reselect) for memoized selectors