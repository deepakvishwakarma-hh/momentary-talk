# Momentary
>Like its name, it is a short period chatting application.
You can start chatting by configuring your room in the app.

>[Click to visit Momentary](https://momentary.vercel.app/ "click to visit momentary")


**Project Detail**
+ Created With Nextjs Typescript
+ Deployed on vercel
+ Firebase for Realtime Database
+ Chakra-UI for styling
+ Redux, React-Redux for state management
+ FramerMotion for transitions
+ JWT (Json Web Token) for Authentication

------------

#### How its work? 🚀
 Momentary uses **Google Firebase** for data storage, **Authentication** and it is fully open-source.

##### 🔐 About user security?
 * **RAT** : When the user creates a room, he has an option Rat (Room Auto Termination). **RAT** termianate room after the TT (termination time).
 
 * **SRT** : (Single room at a time).It alerts the user by anecdotally of the old room's presence. This old room alerts you of data leakage.
 
 *  **Person blocking** : you can block member of the room except admin.
 
 * **Administrator control** :  The administrator can also terminate the room whenever they wants and also the block.
 
 
##  Documentation v1.0.0

###  + Authentication 
 >Will be the first to encounter it. Currently we only support only **Google Auth Provider**
 
 <img src="https://i.ibb.co/cDc8zK6/login-Wall.png"  alt="login-Wall" border="0">
 
### + Room Configuring
> You can configure the room. can set  ATT

<img src="https://i.ibb.co/NFdz8mS/config-wal-with-hl.png" alt="config-wal-with-hl" border="0">

> click **Box** like button model will be open

<img src="https://i.ibb.co/7W1srZ0/model-wall.png" alt="model-wall" border="0">
> 
You can create a room by clicking the button below the model. If you create the app without selecting it, then the default **RTT**  will be 5 minutes

<img src="https://i.ibb.co/5hxCLkr/room-ball.png" alt="room-ball" border="0">
> if you can see this type of page , Congratulation you created Room with RTT - 5min
Room invitation link is automatic copied on your clipboard.

### + Room Settings & controls

<a href="https://ibb.co/MhPTmCw"><img src="https://i.ibb.co/N3WhMyD/room-ball-with-setting-button.png" alt="room-ball-with-setting-button" border="0"></a>

> In the very top corner of the chat terminal, you will see a **setting** icon. click popup will show.

<img src="https://i.ibb.co/3cxVmX8/setting-popup-active.png" alt="setting-popup-active" border="0">

> popup looks like -

>***Member section**
In the member section, you can see the basic information of the member.
Also, the member can also block the member except the admin. visit and explore.

>***Invitation link section**
You can view and copy the invitation link here.

>***Administrator section**
This section will show you who is the admin,
And if you are admin then app can also terminate room from here

>***Action control** 
From this section you can remove the message written by your actions at any time.

>***Termination time** 
On the side of the clocks you will see the time, this is the counter of the termination time. The room will automatically terminate when it is zero.

### + Alearts 
> We have privacy alert.

<img src="https://i.ibb.co/YpVJsVJ/high-security-alr.png" alt="high-security-alr" border="0"></a>
> **High security alert** - You will see this alert when your room is not terminated.

