# SCOPE 
## advantage-blackjack
* This repo's code will create a simulator for blackjack and several variations of blackjack.
* Other blackjack variations may be added as needed.
* This will be deployed to the world wide web at advantageblackjack.com

## Included Blackjack Variations
* For MVP, the versions will be classic blackjack and DoubleUp Blackjack, but beyond MVP, variations will include: 
  * Big Bet Blackjack
  * Double Down Madness
  * Spanish21
* Beyond MVP will also include a tool (tentatively called "perfect play") which will allow a user to see what the best move was based on the exact composition of the deck. 

## FEATURES
### Simulations
### Data Mining
### Chart Creation
### Practice
### Speed Practice
### Perfect Play
### Feed Back and Polls
### FAQ section
### About

## Features of a Simulation
### Create and save customized configuration and strategies, including:
* table conditions 
* play charts
* counting strategies
* tipping strategies
* bet resizing strategies
* bet spread strategies
* wonging strategies
* insurance strategies
### Create and save custom players with their own
* play chart
* counting strategy
* tipping strategy
* bet resizing strategy
* bet spreading strategy
* wonging strategy
* insurance strategy
### Create and save tables with
* customized players
* customized table conditions 
### Run simulations on a table with conditions and players and _mine the resullts_
### Several configurations for players, tables and configurations would be hard coded, but custom configurations would be stored in local storage
### Configurations will include:
* an explanation to let the user know what the feauture is for and how it works
* a link to a youtube video explaining what the feature does and how it works (beyond MVP?)
* a warning to let the user know what to expect if local storage is cleared
* a feedback link to allow the user to send configuration specific feedback, via email.js

## A play chart should include a button to create a human readable chart
* in the UI (in a modal?)
* in a printable PDF
* the size of the chart should be adjustable to allow for something that can be brought into the casino on a keychain.
* the player should be able to change the name of the chart to represent it as something other than it is

## Data mine the simulation results
* Chart a players results over tens of thousands or even millions of hands of:
  * player's bankroll (line graph)
    * this chart would be zoomable
    * clicking on an individual point in the graph bring the user to a UI where the hand can be seen as it would exist on a blackjack table including the history of the players decisions
  * the total amount of money won at each true count (bar graph)
  * the per-hand amount of money won at each true count (bar graph)
  * the actual per-hand ROI at each true count, i.e. the avarage amount won divided by the average amount bet at each true count (bar graph)
* Calculate the overall ROI, includes converting this number into an hourly rate based on the users estimated hands per hour.
* List the gaps, and the lenghts of the gaps, between all time highs. This could involve zoomed-into sections of a chart.
* Show the downward swing lengths, in terms of bets, and compare them to the amount of bets the the users bankroll contains. This is an attempt to make the Risk of Ruin more visual.
* For insurance
  * for everyhand with a dealers ace, record the TC and EV of insurance (from the players perspective to account for pitch games where it can vary)
  * use a bar chart to show EV with every count
  * find the 1/10 of a true count where insurance is profitable on average
* Includes
  * an explanation to let the user know what the feauture is for and how it works
  * a link to a youtube video explaining what the feature does and how it works (beyond MVP?)
  * a feedback link to allow the user to send configuration specific feedback, via email.js

## Explore results for different decisions for different hands for different counting systems, effectively _making a deviation chart for **any** counting system, **including one the player creates**_.
* This would be done with running simulations that look for a specific hand and recording the results for all playable decisions for that combination.
* The UI for this would be 2 fold:
  * Input conditions before the simulation is run
    * The players first 2 cards
    * the dealers up card
    * The counting strategy a player is using
  * Chart the results after the simulation is run
    * Bar chart showing the EV of each decision
    * displays the amount of times each decision happened at each count so the player can determine if the sample size is sufficient
    * Chart should be "zoomable"
* Results would be stored with indexDB as it having several would quickly eatup local storage.
* This approach may not be possible with Spanish21 (or any variation where complex decisions are made beyond the second card).

## Practice
* A player may practice playing full shoes of a particular variation of blackjack based on their choice of:
  * table conditions
  * play chart
  * bet spreading strategy
  * bankroll.
* The player may set the testing options to eveluate the players: 
  * betting decisions
  * play decisions.
* The practice level can be set to show hints before a betting or playing decision is made or after.
* Configured bots may be added to the table.
* "Perfect Play" may be set to let the player know when the player's decision is not in accordance with "Perfect Play" (regardless if it is in accordance with the play charts decision) and the actual EV cost of it. (beyond MVP)

## Speed Practice
* For a particular variation of blackjack, a player may practice only the decision to be made for the first two cards based on their choice of table conditions.
* The UI will account for when the player wants to account for the TC. 
* A player may chose which dealers up-cards or what 2 card combos they wish to practice against.
* The approach for Spanish21 will be signaficantly more involved as it will involve decisions for hands with more than 2 cards.

## Feed Back and Polls
* A Feedback button 
  * will be available on several pages (as well as the footer) to allow users to leave suggestions for improvements or general comments.
  * will know what URL it was clicked allowing for specific feedback guidelines and the receiver will have access to the data of where the user was when the button was clicked.
* Polls: 
  * may appear on a page to gather opinions of how the UI should behave, or anything else the developer wants input on. 
  * will allow for specific questions to be answered, preferable by checkbox or radio button, and will not allow for text input.

## FAQ section
* This will probably be a link on the footer and will grow as feedback accumulates

## About
* Gives information about
  * me as the author of the website
  * my motivation
* Discusses where I see this website going
* Acknowledgments
  * BJA
  * Wizard of Odds
  * The Community
  * God

**********************************************************************
**********************************************************************

# STORIES - CHUNCKED OUT WORK
## Defination of done - for a story to be complete, it must:
* meet all ACs
* exist in the repo on its own branch
* be merged into the master branch
* contain proper CSS for all screen sizes
* contain all text, not just placeholder text
* be deployed, if it involves changes to the UI
* youtube videos are NOT part of the definition of done

## Before a new story is begun
* the previous story should be complete
* the new story must be completely written. All ACs must be clear.

## Stories
* repo, readme and story outlines
* ### STATUS: COMPLETE
* ### note: stories only eist up to implementing classic blackjack

* Purchase advantageblackjack URL from Google (ABJ)
  * There should be an option from google for an email associated with ABJ. Take it.
  * If there is no email address option associated with ABJ, then create a gmail account
  * ### STATUS: COMPLETE
  * ### notes:
    * google was purchased by squarespace
    * advantageblackjack.com was purchased ($14) through squarespace
    * log into squarespace account with mikedowd300@gmail.com
    * email account is advantageblackjack@gmail.com

* Create angular app (ABJ) with "Hello Advantage Blackjack" as content and deploy
  * Update to latest version of angular and node
    * ### STATUS: COMPLETE
  * Replace app component content with "Hello Advantage Blackjack"
    * ### STATUS: COMPLETE
  * deploy from gitlab pages to www.advantageblackjack.com 
    * ### STATUS: COMPLETE
    * ### DOCUMENTATION
      * #### Set Up The DNS records
        * this involves going to the domain manager for advantageblackjack.com (https://account.squarespace.com/domains/managed/advantageblackjack.com)
        * Clicking the DNS link from there will take you to DNS settings (https://account.squarespace.com/domains/managed/advantageblackjack.com/dns/dns-settings)
        * Delete the records provided by squarespace
        * create 4 new record with information from the github repo (https://github.com/<git hub account name>/<repo name>)
          * go to "settings" currently found in the top nav bar
          * click on "Pages" currently located in the side nav (https://github.com/<git hub account name>/<repo name>/settings/pages)
          * click "Learn more about configuring custom domains."
          * click "Managing a custom domain for your GitHub Pages site" (https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
          * scroll down to the 4 IP address found under "To create A records, point your apex domain to the IP addresses for GitHub Pages." - These are real IP addresses, not examples.
          * In squarespace, create a new record for each IP address
            * HOST - value is "@"
            * TYPE - value is "A"
            * PRIORITY - ignore
            * TTL - ignore
            * DATA - an IP address from github
          * create a 5th record with the following values
            * HOST - value is "WWW"
            * TYPE - value is "CNAME"
            * PRIORITY - ignore
            * TTL - ignore
            * DATA - <name of github account>.github.io
      * Deploy from github using ng deploy
        * This youtube video explains almost all the steps, except it will not deploy to a custom domain - https://www.google.com/search?q=deploy+angular+from+github+pages&sca_esv=15864d34a86b306d&source=lnt&tbs=qdr:y&sa=X&ved=2ahUKEwjRwoWNkuGOAxVw4ckDHX9zBhAQpwV6BAgEEAo&biw=1591&bih=677&dpr=1#fpstate=ive&vld=cid:ec5ee4d4,vid:l_d3G-P2XG8,st:0
        * In pages (https://github.com/<git hub account name>/<repo name>/settings/pages) set:
          * source - "deploy from branch"
          * branch - "gh-pages" - automatically generated with "ng deploy"
          * path - '/(root)'
          * Custom Domain - advantageblackjack.com
          * save
        * The only variance from the video is that in angular json, for options, since this is a custom site, for "options", the value should be: 
        { "cname": "advantageblackjack.com" }
        * If setup correctly, running "ng deploy" from the comman line will deploy the app to the squarespace site.


* Create email.js account for ABJ and document
  * ### STATUS: COMPLETE
  * ### DOCUMENTATION
    * public key: e6uXNkHPbiTl67p1p
    * service ID: abj_feedback_service
    * template ID: template_34sqcm7
    * Installed via NPM

* Create feedback service and temporary component for testing email.js
  * write service with the suggested email.js code
    * ### STATUS: OPEN - to be completed with feedback component
    * The code the service will need is currently part of the app component
  * use email address associated with the website
    * ### STATUS: COMPLETE
  * add temporary component or section that uses email.js service to the app component
    * ### STATUS: COMPLETE

* Find an appropriate tab image
  * store in '/public' folder
  * ### STATUS: COMPLETE

* Determine styleguide
  * document here
  * create shared styles file
  * File will grow as guidelines are expanded
  * ### ADDED CODE FOR CUSTOM SELECT COMPONENT
  * ### COMPLETE CUSTOM SHARED COMPONENTS
    * #### select - abj-select
    * #### anchor - abj-anchor
    * #### button - abj-button

* Make shared select dropdown component
  * follow / create the styleguide
  * parent should be aware of selection
  * ### STATUS: COMPLETE

* Make a page class
  * follow / create the styleguide
  * ### STATUS: COMPLETE
  * ### NOTE - THIS MAY BE TWEEKED OR ADDED TO AS NEEDED

* Create the following routes and page components
  * '/home'
  * '/classic/home'
  * '/classic/customizations'
  * '/classic/customizations'
  * '/classic/customizations/conditions'
  * '/classic/customizations/player'
  * '/classic/customizations/table'
  * '/classic/customizations/bet-spread'
  * '/classic/customizations/play-chart'
  * '/classic/customizations/unit-resizing'
  * '/classic/customizations/wonging'
  * '/classic/customizations/tipping'
  * '/classic/customizations/custom-counting-system'
  * '/classic/customizations/insurance-plan'
  * '/classic/simulation'
  * '/classic/simulation-results'
  * '/classic/practice'
  * '/classic/speed-practice'
  * '/double-up/home'
  * '/double-up/customizations'
  * '/double-up/customizations/conditions'
  * '/double-up/customizations/player'
  * '/double-up/customizations/table'
  * '/double-up/customizations/bet-spread'
  * '/double-up/customizations/play-chart'
  * '/double-up/customizations/unit-resizing'
  * '/double-up/customizations/wonging'
  * '/double-up/customizations/tipping'
  * '/double-up/customizations/custom-counting-system'
  * '/double-up/customizations/insurance-plan'
  * '/double-up/simulation'
  * '/double-up/simulation-results'
  * '/double-up/practice'
  * '/double-up/speed-practice'
* ### STATUS: PARTIALLY COMPLETE - CARRY REMAINDER INTO LATER TICKET
* ### '/double-up/' most components are not made, but routes are.
* ### '/double-up/' routes currently point to '/classic' components (for the most part).
* ### '/double-up/' component completion will be completed after '/classic' is complete

* Make routes, header and header navigation
  * component should use its own style
  * default route is home, and explains what the site offers
    * ### WILL BE COMPLETED IN ANOTHER STORY
  * selecting blackjack variation should change the route to the variation page
  * blackjack variation should be set from header via tabs
    * home
    * classic
    * doubleup
  * Clicking a variation tab should take the user to the url/page for that variation
  * The link in the header to which the player has navigated should be removed from the tab options
  * make sure navigating to a link does not reload the app
* ### STATUS: COMPLETE

* Make page header as a second level of navigation for 'classic' and 'doubleup'
  * page headers should contain links to:
    * Customizations
    * Simulations
    * Index Chart
    * Practice
    * Speed Practice
* ### STATUS: COMPLETE

* Make an option in the header to set a variation as default
  * The default variation is kept in local storage
  * if no default option exists, then "home" is the default variation
  * a specific feature may NOT be included in the default url
* ### STATUS: COMPLETE

* Create a route and page component for "/about-us" 
  * content will be part of another ticket
  * add this route to the route guard with no restrictions
* ### STATUS: COMPLETE

* Create a route and page component for "/feedback" 
  * content will be part of another ticket
  * add this route to the route guard with no restrictions
* ### STATUS: COMPLETE

* Create a route and page component for "/faqs" 
  * content will be part of another ticket
  * add this route to the route guard with no restrictions
* ### STATUS: COMPLETE

* Create a shared button component
  * The parent controls the action when the button emits
* ### STATUS: COMPLETE

* Create the footer
  * The footer will appear at the bottom of a pages content. If the page has no, or very littly content, then the footer will appear at the bottom of the screen.
  * The user can not scroll past the footer.
  * The footer will have links to the following existing pages
    * '/about-us'
    * '/feedback'
    * '/faqs'
  * make sure navigating to a link does not reload the app
* ### STATUS: COMPLETE

* Create 52 files with images of every card
  * store in /public/card-images
  * The name of the page should follow a pattern so that the files can be systematically accessed
  * consistantly use .svg, .png or .jpg - Uses .png
* ### STATUS: COMPLETE

* Create a route guard
  * The guard should grow as pages are added
  * This story can carry over into the next stage if needed
* ### STATUS: IN PROGRESS - to be added to as needed

* Create a local storage (LS) service
  * Include a method to check how much space is left in LS (just in case)
  * For the preferred game variation:
    * use 'preferred-variation' as a LS key 
      * ### STATUS: COMPLETE
    * If preferred-variation does not exist then create it and give it the value of 'home'
      * ### STATUS: COMPLETE
  * Other stored values (LSValue) include
    * conditions
    * tipping
    * bet spread
    * unit resizing
    * wonging
    * counting
    * insurance
    * play chart
    * shoe
  * Shoe
    * to save local storage, the shoe can be shared
    * Spanish21, and possibly other variations, will need their own shoe
  * The other stored values should be name spaced accotding to the variation
  * When an item is saved into LS, if the variation name space does not exist, it will be created
  * When an item is saved into LS, if the value type does not exist within a namespace, it will be created
  * The LS service / LS API should create, read, update and delete items
    * When a value is deleted, all places that value is used will instead return a default value
  * Updates will not get granular past variation.LSValue.instance-name
  * Testing will occur as each LSValue UI is created

* Handle responsiveness for variation nav
  * When a footer page is active there is 1 more link
  * Consider using a smaller font, wrapping text, using different verbiage
* ### STATUS: COMPLETE
  * #### NOTE: uses different verbiage at lower breakpoints

* Handle responsiveness for Feature Navigation on a page
  * One breakpoint to decrease padding and use a small font size
  * Second breakpoint to wrap text
* ### STATUS: COMPLETE
  * #### NOTE: it looks good down to 400px
  
* ## NOTE - New Result Festure - "What if" betspreads
  * The results of a specific simulation can be adjusted to reflect 
    * a different betspread
    * if the user could see the burn card
    * if the user could see the botton card
  * The feature will be available through '/double-up/simulation/results' page

* ## NOTE - New Result Festure - "What if" same shoe with different anything / everything
  * The card order will be stored for each fresh shoe
  * After a simulation, the player may run the same shoes as the original simulation, but with changes to ANY set of conditions, strategy or number/type of players.
  * The same order of cards will be dealt, but the hands may be different, potentialy very different, based on the changes.
    * The idea is to see if that, since the cards will have the exact same order, the positive and negative counts will be similar, so what will it do to the overall results of a shoe.
    * HOW TO MEASURE / DISPLAY THE RESULTS OF EACH SHOW COMPARED TO THE ORIGINAL
  * The feature will be available through '/double-up/simulation/results' page

* ## NOTE - Allow for a strategy where a player wongs out completely.
  * A ploppy should be at the table to eat cards while the player is wonged out.

* ## NOTE - Decide if a back button should appear to take the user to the previous page. 
  * This would be to keep or not keep the same state when going back and forth between conditions and strategies
  * This will be easier to imagine once the pages populating from local storage existare functional

--------------------------------- FEEDBACK PAGE -----------------------------------

* Create a shared text-area component
  * The parent becomes aware of the text-area content when the text-area emits onchanges
* ### STATUS: COMPLETE

* Create a shared text-input component
  * The parent becomes aware of the text content when the input emits onchanges
* ### STATUS: COMPLETE

* Create a route and page component for "/feedback"
  * add this route to the route guard with no restrictions
  * amail service will track the entry point for feedbak
  * page will get url specific email content from the feedback service
  * the components content will be:
    * Title
    * instructions
    * optional text-input if the player would like to be contacted back
    * text-area component
    * submit button
      * Text will say "Send Email"
      * If no text is sent in the text-area, then the submit button is disabled and the textarea border becomes red
      * Succesfully clicking submit will send an email via emailjs to the website address. This will use the service already written for email.js
      * Succesfully clicking submit will set the textarea border color back to normal
* ### STATUS: COMPLETE

* Import an Icon Library
* ### STATUS: COMPLETE
* ### NOTE: 
  * imported svgs from google fonts/icons
  * couldn't fin an npm with decent documentation

* Create a shared modal component
  * modal can be configured with these optional properties
    * icon
    * a primary message
    * button and action
  * Closing the modal is on the dev and should be part of the "X" action
  * The button can be configured with:
    * Action text
    * An action
* ### STATUS: COMPLETE

* Implement a success / failure modal component for subitting feedback
  * Upon succesfully submitting feedback, the user will receive a success modal
  * An unsuccesful submission will result in an error modal
  * Configure the button with "Try Again" after the first failure and an action to resubmit
  * Configure the button with "Try Again Later" after the second failure attempt.
  * No button should appear after the second fail attempt
  * Closing the modal should take the user back to the entry point
* ### STATUS: COMPLETE

----------------------------------- FAQ PAGE--------------------------------------

* Create an accordion component
  * A single line is exposed followed my a chevron
  * Clicking the chevron
    * opens the accordion to whatever size it takes to contain the content
    * flips the chevron
  * Clicking the chevron again closes the accordion
    * flips the chevron
  * flipping the chevron involves no animation
* ### STATUS: COMPLETE

* Create a list of questions and answers. 
  * These will be displayed in accordion components
  * As development, question will caome up, they should live on this page
  * Grows with the code
* ### STATUS: COMPLETE

----------------------------------- ABOUT US --------------------------------------

* The only link to this is from the footer
* Add content to the '/about-us' page
  * Gives information about
    * my motivation
    * my personal blackjack journey
    * Acknowledgments
      * BJA
      * Wizard of Odds
      * Richard Munchkin and Bob Dancer
      * God
* ### STATUS: COMPLETE

-------------------------------- ROOT HOME PAGE -----------------------------------

* Create a videa-modal component that covers the entire page including the header and footer.
  * cover the app component as a modal 
  * The page below it should not be scrollable
  * The modal background should be just transparent enough to barely see the page behind it.
  * The modal should close by clicking an "X" in the top right corner of the modal
  * A video element with a loaded youtube video should be in the center of the modal
  * The video element should be big as possible but still leave a wide margin.
    * Should be responsive
      ### WAS NOT WORKING WITH A RESIZE LISTENER - BEYOND MVP
    * should have a height : width ratio of 16 : 9
  * The modal component communicates with a pubic video service
* ### STATUS: COMPLETE
  * #### TODO - update url with actual url

* Video Modal Service
  * Opens the modal
  * closes the modal
  * contains an object of youtube urls where keys are passed from the calling component to target a particular video url
  * until actual urls exist, use the same generic url
  * ### STATUS: COMPLETE
  
* Build a Feature Introduction component where the details of a feature could be loaded
  * Features may include
    * Picture - begin with a picture place holder as the pictures them selves will bot exist until MVP exists.
      * picture assets should live in the public folder
      * even thought the actual pictures, a place holder for each should exist
      * placeholder pictures can be identical
    * Feature Header
    * tagline
    * an array of text paragraphs explaining the feature
    * a button to trigger a youtube video with a demo of the feature
  * At larger screen sizes the image should be next to the text
  * At mobile screen sizes, the picture should stach with the 
    * title, 
    * the tagline, 
    * the picture, 
    * the text 
    * the video button.
  * ### STATUS: COMPLETE

* On the Root Home page,
  * import the Feature Introduction component
  * Create objects to feed into the component based th following titles
    * Do you need proof card counting works?               
    * VARIATIONS
      * Double Up
      * Spanish 21
      * Wizard of ODDs
      * The problema with variations
        * No basic strategy chart
        * No deviations
        * No EV expectations
    * Beyond Simulations
      * Practice / Play
      * Speed Practice
      * Basic Strategy / Deviation Chart Creation
      * Insurance Analysis
      * "What if" with the bet spreads
      * 0 EV point

---------------------------- HOW TO MAKE A SIMULATIONS ----------------------------

* Create Bare bones component for HowToPrepareASimulation

* Create a route "/how-to-make-a-simulation" to HowToPrepareASimulation

* Import a "Bullet Point" icon
* ### STATUS: COMPLETE
  * ### NOTE: just made a dot with CSS
  * ### NOTE: its not even sharable

* Update the ABJFeatureIntroComponent to include the icons as bullet points for the textContent

* Fill in the bare bones component with directions to make each step of a simulation
  * Use the ABJFeatureIntroComponent
  * Work Backwards from the simulation itself
  * Table
  * Table Conditions
  * Player
    * Bet Spreat
    * Unit Resizing
    * Wonging
    * Tipping
    * Counting Strategy
    * Do Not Do A Deviation Chart
  * Link to the "HOW TO RUN A SIMULATION" videos

------------------------------ CLASSIC BLACKJACK ----------------------------------

* Create stories for classic blackjack

* classic blackjack is the first variation of blackjack to be implemented 
  * it should live in its own folder to seperate it as other variations are added

* Implement a feature toggles object
  * Some uncommon table conditions are very exploitable, or, at least deserve an investigation into how exploitable they might be.
    * The number of these rules, conditions is always growing as new promotions are thought up
    * Depending on the nature of the promotion, it might merit generating a new deviations chart.
  * Instead of coding all of these as part of MVP, make a hard coded feature toggle for each one.
    * The feature toggle will
      * Determine if the condition appears in the UI conditions page
      * Will determine if the logic to handle it is engaged
  * This approach allows the dev to add conditions to the UI without (ever) implementing them.
  * Depending on the nature of the rule / condition / promotion, as part of a full implementation, the user may need a strategy change to take full advantage, this may involve a new condition strategy component.
  * A toggle's status can only be changed via an MR and a new deployment
* ### STATUS: COMPLETE

* Documentation each toggle of this page at DOCUMENTATION - FEATURE TOGGLES

------------------------- CLASSIC BLACKJACK - CONDITIONS -----------------------------

* Create the classic-conditions UI ans storing the values in local storage
  * Each condition has information for hoe the condition is displayed in the UI
    * Includes a "Whats This" field, the value of which will populate a tooltip for the condition.
    * Includes a "Displayed With" field, the content of which is a reference to the type of component to display the condition.
    * includes the value of the condition
    * Each custom display component should be a seperate story, or 2 seperate stories if deemed appropriate.
    * Custom display components will include:
      * checkbox
      * number input
      * radio group
      * tool tip
    * Each custom component should report the value of the input change to the parent component.
    * The parent component which consomes a conditions object displays all the conditions and will be responsible for CRUD operations with the different condition configurations.

  * each item is an object 
    * create an interface for the object
    * the abbreviated rule name is the key for the object
    * the properties on the object are: 
      * name: this should be human readable
      * what's this: a tool tip explaining the purpose of a condition, may be null
    * the component that displays the condition in the UI
      * this is so the UI can filter by condition and display display types together via an ng-for
        * There should be a sharable (between variations) ConditionDisplayTypes enum
      * most of these will be types of an input such as
        * text-input
        * number-input
        * checkbox
      * others will be custom components
        * group of radio buttons
        * progress slider
        * TBD - each component will be part of a story, or a story itself.
        * for the purpose of this story, displayTypes can be "CUSTOM"
    * the feature toggle controlling the feature
      * many of the features will be standard ad can have the "isStandard" feature toggle
        * the isStandard toggle will not be implemented in the UI or in the logic
        * this toggle exists to force the dev to consider the implementation of the feature
      * as new feature toggles are created, they must be added to the classicFeatureToggles object
      * as new feature toggles are created, they documant of this page at DOCUMENTATION - FEATURE TOGGLES

---------------------------- CLASSIC BLACKJACK - SHOE --------------------------------

* Create the shoe class
  * This will be shared by the different variations unless the variations require a special deck as does Spanish21
  * The shoe in LS will be namespaced as 'shared' unless it is specific to a variation, in which case the name spaece will be the version - this is only for the shoe, not the other LSValues
  * The shoe will deal the cards and hold the discards
  * The shoe will count the cards, according to the counting method provided
  * Players may round the TC differently, the shoe will only track the RC
  * Each shoe will be indexed
  * Each hand will be indexed
  * A hand will have an id based on the shoe index and the hand index
  * At the very beginning of a shoe, the card order should be condensed and stored using indexDB
    * This is to be used with the "What if" feature, where same shoe can be played against different strategies
  * the unseen cards in a shoe may be converted into an abbrevated string
    * for later analysis by "Perfect Play" 
    * beyond MVP
    * the string would most likely be stored with the players hand, not in the show itself - TBD

----------------------------------- POLL PAGE -------------------------------------

* Create a "Poll" page, which reads from a poll service. It knows which "Poll" to display based on the entry point.
  * Create a test entrypoint on '/classic/home'
  * The entry point should take the user to "/poll"
  * Allow access to the poll page via the route guards, with restrictions.
  * clicking the entry point should allow access via the route guard
  * The poll service will have configurations for each "Poll"
  * To add a new "Poll" the developer must 
    * build a new poll configuration
    * add the configuration to the poll object where the key is tied to the entry point
  * a poll configuration will have: 
    * a description, which will appear in the UI and explain to the user wha is being asked
    * a list of questions with either 
      * a yes / no answer, which will be displayed with text and a check box, or
      * a select one answer, which will provide 
        * a text question and
        * 3 or more radio buttons with a descriptive label
    * A submit button
  * When the user navigates to the poll page, the page will 
    * receive the proper configuration from the service
    * display the content
    * components for the radio options and the checkboxes will display the questions
  * The submit button will be disabled until all the poll questions have been completed
  * Submitting the poll will result in the information being emailed via the email.js service
  * Upon succesfully submitting the poll, the user will receive a success modal
  * An unsuccesful submission will result in an error modal
  * Clicking the modals "x" will close the modal
  * Clicking the modals "Try Again" button (for errors) will result in a resubmission attempt
  * After a second failure attempt, the "Try Again" button should not appear and instead a "Try again later" message should appear.
  * Clicking the "x" in the modal should reset the route guard restriction

--------------------------------- YOUTUBE VIDEOS -------------------------------------

                    ++++++++++++++++ HOME PAGE +++++++++++++++

* NOTE: Demos are Genaralized and Variation Agnostic
* NOTE: Each specific page will have more specific videos and/or textual explanations

* OVERALL DEMO
  * Show the results of a simulation
    * Explain that it was from series of rounds run again a table
      * that table had players 
        * players had configurations
          * Bet Spread
          * Unit resizing
          * Wonging
          * Counting System
          * Deviation Chart
        * Players are customizable
          * customizations can be saves
      * That table had configurable house rules
    * Show the replay of the hands
    * Show ROI and AV in rounds per hour
  * Show the ROI charts
  
* VARIATIONS
  * Double Up
  * Spanish 21
  * Wizard of ODDs
  * The problema with variations
    * No basic strategy chart
    * No deviations
    * No EV expectations

* Beyond Simulations
  * Practice / Play
  * Speed Practice
  * Basic Strategy / Deviation Chart Creation
  * Insurance Analysis
  * "What if" with the bet spreads
  * 0 EV point
  
                    ++++++++ HOW TO RUN A SIMULATION ++++++++++

  *** NOTE: The approach is to demo it backwards, expect user to act forwards

  * Run a simulation
    * Do not create any thing, just select an existing table, existing conditions, and any number of iterations

  * Create a table
    * Select pre-existing users
    * Select pre-existing conditions
    * Run a simulation with the table you created
    * Cover editing or deleting tables
    * Mention about videos, FAQs ON THE TABLE PAGE that dive deeper
    * Saving the table

  * Create several players
    * Add name, bankroll
    * Add betspread - choose existing betspread
    * Add Unit Resizing Strategy - choose existing betspread
    * Add Counting Strategy - choose existing strategy
    * Add Wonging Strategy - choose existing strategy
    * Add Tipping Strateg - choose existing strategy
    * Create table and add players
    * Run Simulation
    * Cover editing and deleting tables
    * cover what happens to tables that have deleted players
    * Saving a player

  * Create Table Conditions
    * Explain the demo is variation agnostic
    * Mention special rules, but don't go deep
    * Make an awesome set of conditions
    * Create or edit a table to have the conditions
    * Run a simulation
    * Cover editing and deleting conditions
    * Cover what happens when to a table with a set of conditions that have been deleted

  * Create bet spread strategies
    * Create or edit a player to have the strategy
    * Add the player to a table
    * Run a simulation with that table

  * Create a Unit Resizing strategy
    * Create or edit a player to have the strategy
    * Add the player to a table
    * Run a simulation with that table

  * Create a Wonging strategy
    * Create or edit a player to have the strategy
    * Add the player to a table
    * Run a simulation with that table

  * Create a Tipping strategy
    * Create or edit a player to have the strategy
    * Add the player to a table
    * Run a simulation with that table

  * Create a Counting strategy similar to Hi-Lo
    * Play Basic Strategy
    * Explain creating a deviation chart is an iterative process and to go to the correct page for it
    * Demo the true count total money wn to come up with a bet spread
    * Create or edit a player to have the strategy
    * Add the player to a table
    * Run a simulation with that table

--------------------------------- BEYOND MVP -------------------------------------

* FAQ Page
  * When 1 faq is opened, the already opened one should close
  * Add animation for expanding question and answer

-------------- DOCUMENTATION - INSTRUCTIONS TO ADD A NEW VARIATION  --------------

* Add a variation tab to HeaderService
  * This will add the variation to the header which may create a need for responsive CSS as some breakpoint
* Add a route for the new variations in 'advantage-blackjack/src/app/app.routes.ts'
* Add routes for the features that apply
  * Customizations
  * Simulations
  * Index Chart
  * Practice
  * Speed Practice
* Update the content in the "home" page to include info about the new variation
* Create the conditions model

------------------------ DOCUMENTATION - FEATURE TOGGLES  ------------------------

* Feature toggles are not customer facing, they exist for the developer
* Updating a feature toggle requires an MR and a new deployment
* Non-standard features are added as false and are not flipped to true until the feature has been implemented enough to bring value (usually in ters of EV) to the player
  * additional implementation surrounding the feature toggle, such as a UI to implmement a custom strategy for it, may be added later and have their own story
* Feature toggles control if a rule / condition / promotion has been fully implemented. 
  * It allows the developer to add a feature to the ui without implementing it fully
  * generally, it will not control logic that doesn't have a UI component related to it
* Feature toggles include: 
  * isStandard
    * this toggle is unique in that it has no implementation of any kind associated with it
    * this toggle forces the develop to consider the implementation of every rule / condition / promotion
  * doubleForLess
