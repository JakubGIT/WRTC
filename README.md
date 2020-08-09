# WRTC
Simple WebRTC Videochat for 2 peers<br>
ONLY FOR "SEMINAR WEB-TECHNOLOGIEN SoSe2020"<br>
based on tutorial: https://www.youtube.com/watch?v=KLCcCTFivhM, thanks Vinnu1! <br>
https version<br>
<br>

# install

  install npm (if needed): <br>

    sudo apt-get install curl

    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

    sudo apt-get install -y nodejs

  clone the depository<br>

  inside the depository:<br>

    npm install


run<br>

    npm start

<br>
join<br><br>
  https://[IP-Adress of the computer]:4444<br>
  max. 2 participants<br>

# for developers

  install browserify: <br>

    npm i browserify --save-dev

  build bundle.js after changing main.js: <br>

    npm run build
