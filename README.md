
Submit Project for Evaluation
TinyApp Task
60 - 85 minutes
 Status
Incomplete
This activity will guide you through the project submission process for TinyApp.

If you're planning on working on any stretch goals or extra features for your project, do still complete this activity now. You may find you're missing functional requirements, or you may find some bugs that need fixing, so to avoid a last-minute scramble when submitting your project we suggest you get this done before you work on stretch.

And if for any reason you make changes to your project after you've submitted it, that's OK: You can re-submit your project as many times as you need to.

Step 1: Verify the project is complete
At the end of this activity (which may take some time to finish if you find any problems during this submission process) you'll be submitting TinyApp for evaluation.

Note
Your project will be rejected if it does not meet all the *major** functional requirements*, so it's important that you double-check you've fulfilled them all. If your project has not fulfilled the minor functional requirements it will not be rejected, but it's nevertheless a good idea to get as many of them completed as possible.

Instruction
Make sure you've fulfilled all the major functional requirements for TinyApp.

A good approach could be to test each requirement in your app, one by one, keeping a list of any problems or bugs you find. And because TinyApp uses cookies, make sure also to test your app from a "clean" state – that is, with no cookies set. (Remember, you can clear the cookies in Chrome; alternatively, you can close any open Chrome Incognito windows and launch a fresh Incognito window which will automatically have no prior cookies set).

Instruction
If you've discovered that you're missing (major) functional requirements, or if you've found any major bugs, fix them then re-test your app.

It's alright if minor bugs are still present in your app (or if they're found by a mentor while evaluating), but keep in mind that if any major bugs are found your project may be rejected. Test thoroughly!

You can see all the functional requirements on the TinyApp Project Description Page. Note that all requirements listed are "Major", unless marked as "Minor" or "Stretch".

Step 2: Clean up the code
Instruction
After you've confirmed that your project is indeed complete and working correctly, take some time to clean up your code.

Besides checking for completeness and correctness, your mentors will also evaluate whether your code follows best practices and has a clear and consistent style. Some of what they'll be looking for:

Correct variable declaration and semi-colon use
Proper and consistent indentation and spacing
Clear and consistent function and variable names
Modular and reusable code (no need to break your code into Node modules, but using helper functions to keep the code DRY is a good idea)
Well-commented code (in other words, that your code is easy to read)
That no debugging, commented-out or dead/un-used code is present
Sensible structure for the project's files and directories
Step 3: Verify your project will install on your mentors' computers
Your mentors will run your TinyApp projects locally on their own computers in order to evaluate them – meaning, you need to make sure they'll be able to run TinyApp on their computers!

If you were going to be thorough about this, you would clone a copy of your project to test that it installs and runs. But to save time, for our purposes it's enough to verify that your package.json file includes all the necessary dependencies. If it does, that's a strong enough guarantee that TinyApp will install correctly on a mentor's computer.

Instruction
Open your project's package.json file and verify that you've got the following packages listed under the "dependencies" key.

bcrypt
body-parser
cookie-session
ejs
express
method-override (if you implemented the stretch goals for the project)
any other Node packages you may have installed if you implemented extra features
Instruction
If any of the above are missing, install them one-by-one using the following command (replacing <package> with the name of the missing package; if you're missing more than one package, you'll have to run the command below multiple times, once for each missing package).

npm install <package> --save
Instruction
Check that your package.json file now includes all the required packages in the list above. Commit your changes.

Step 4: Add/update README file
In just a few months you'll be sharing your GitHub profile with prospective employers. They'll be looking at your work, including your big projects like this one, and to impress them you're going to add a README file to this project, and in the next step also some screenshots!

Instruction
If your project doesn't already have a README.md file, create a file called README.md in the root project/repo directory.

Most GitHub repos have a README.md in the main repo directory, which provides some details about the project directly below the file and directory structure view. It is rendered as HTML. Here's a screenshot of this, as an example.

"README.md example"

Good README files usually include a title of the project, a brief description, the project's dependencies and any necessary setup steps to get the project running.

Instruction
To get you started, add the following Markdown-formatted text to your README.md file.

# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Final Product

!["screenshot description"](#)
!["screenshot description"](#)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session


## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.