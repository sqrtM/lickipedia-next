## lickipedia 
### a twitter-style approach to sharing and saving your favorite licks.

this project is moving here to keep up with the new version of nextjs : https://github.com/sqrtM/lickipedia-ideo

made possible through the wonders of the [abc music notation](https://abcnotation.com/), paul rosen's [abcjs](https://github.com/paulrosen/abcjs), and a couple peeks at rigo bauer's [react snippets](https://github.com/rigobauer/react-abcjs) (this stuff was surprisingly tricky to get to render in react and keep unique refs and ids etc etc).

![image](https://user-images.githubusercontent.com/79169638/199057720-836f78f7-b2f9-416e-adcd-e06d7c387581.png)

built with next.js and typescript

## features 
currently, there is 
1. a fairly robust collapsable in-browser editor for composing your own music in real time
2. the ability to save your favorite licks to the sidebar for easy access
3. the ability to "fork" licks, giving you a full copy of the original lick to edit, which will then show the parent ID of the lick you forked it from, allowing you to trace the lineage of an idea back, sort of like how it works on something like glslSandbox.
4. the ability to transpose all licks on your feed, making it extra easy to learn your next cool ii-V-I in all 12 keys.

there will be more cool stuff to come, as well!

## want to try ? 
i'm currently having some issues getting everything deployed properly (vercel having some issues at compile time with the abcjs api...), so if you'd like to try the app, just download the repo and run the 'npm run dev' script. everything should work just fine!

thanks, and happy practicing! 
