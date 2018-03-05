Hooray! Hopefully you have pulled in the most updated dev-branch with all of the back-end functions!...
(without having to bang your head...CFBundler not found!!! Ah!!)

~ Please look at the follow files in this order ~

<1> src/actions/README_DB.txt 
<2> src/function_prototype/indexPrototype.js
<3> src/components/ComponentTemplate.js 

~ Back-end file rundown with description ~

src/actions/index.js                        -- contains all of the functions 
src/actions/README_DB.txt                   -- README file...you're in it! 

src/function_prototype/indexPrototype.js    -- all function prototypes (with params and returns)

src/components/CameraPicker.js              -- camera picker component (will merge with front-end component)
src/components/ComponentTemplate.js         -- a template on how to use redux and connect 

src/reducers/* (all reducers)               -- contains all reducers 
src/reducers/index.js                       -- combine reducers into one global store

src/utils/CameraPicker.js                   -- helper function for camera picker 
src/utils/FBLoginComponent.js               -- component for facebook button 


Additional comments:
@Alex: Added the FBLoginComponent to the Login.js already, should be working 
@Everyone: Deleted src/component/App.js because we had two App.js
           Modified the src/App.js to support redux store and combine reducers 