#!/bin/bash

cd /var/www/html/medflick2
sudo chown www-data:www-data -R /var/www/html/medflick2/
sudo chmod 777 -R /var/www/html/medflick2/
npm install
sudo chown www-data:www-data -R /var/www/html/medflick2/.*
sudo chmod 777 -R /var/www/html/medflick2/.*
npm run build
sudo chown www-data:www-data -R /var/www/html/medflick2/.*
sudo chmod 777 -R /var/www/html/medflick2/.*
pm2 delete app1
pm2 start npm --name app1 -- run start -- -p 3000
sudo systemctl restart nginx
