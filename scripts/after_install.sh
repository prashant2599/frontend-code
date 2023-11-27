#!/bin/bash

# sudo chown root:root -R /opt/codedeploy-agent/
# cd /var/www/html/medflick2
# npm install
# npm run build

cd /var/www/html/medflick2
# sudo rm -rf * 
# sudo rm -rf .env .eslintrc.json .gitignore .next package-lock.json
# sudo rm -rf .*
# S3_BUCKET='s3://codepipeline-ap-south-1-286557721030/mainfrontend/SourceArti/'
# latest_object=$(aws s3 ls $S3_BUCKET | sort | tail -n 1 | awk '{print $4}')
# aws s3 cp "$S3_BUCKET$latest_object" .
# unzip "$latest_object"
sudo chown www-data:www-data -R /var/www/html/medflick2/
sudo chmod 777 -R /var/www/html/medflick2/
npm install
npm install sharp
npm run build
pm2 delete app1
pm2 start npm --name app1 -- run start -- -p 3000