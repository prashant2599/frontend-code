#!/bin/bash

sudo chown root:root -R /opt/codedeploy-agent/
set -e
cd /var/www/html/medflick2
sudo rm -rf * 
sudo rm -rf .env .gitignore .next .eslintrc.json .git
aws s3 cp s3://codepipeline-ap-south-1-286557721030/nextjs-1/ . --recursive
sudo chown www-data:www-data -R /var/www/html/medflick2/*
sudo chmod 777 -R /var/www/html/medflick2/*
sudo chown www-data:www-data -R /var/www/html/medflick2/.*
sudo chmod 777 -R /var/www/html/medflick2/.*
