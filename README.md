# corespring-ng-services

A collection of angular services for interacting with the CoresSpring platform.

# building

    npm install
    grunt

# using in your project
## manually
   
    git clone git@github.com:corespring/corespring-ng-services.git
    npm install
    grunt
    # you'll now have js in the dist folder
    
## with bower

    add this to your bower.json: 
    "corespring-ng-services" : "git@github.com:corespring/corespring-ng-services.git"

# testing

    cd spec/runner
    bower install
    cd -
    grunt test
