# PlayWright with Cypress

## Clone / Setup the code
- run npm i


# Integrating with existing project
If you want to integrate playwright in existing cypress projects follow the below steps

- Add the below entries in package.json
 "devDependencies": {
    "clipboardy": "^3.0.0",
    "@playwright/test": "^1.22.2",
    "playwright": "^1.22.0"
}

- Run ```npm i ```

- Create a folder "playwright" in the root folder (same level as "cypress" folder)
  - Write playwright code in that folder

- In the cypress/plugins add a custom task to invoke the playwright code (refer demo code)
  pwGetClipboardData: async () => {   
        return await playwright()
    },
