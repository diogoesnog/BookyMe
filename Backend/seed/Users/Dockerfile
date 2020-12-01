FROM mongo 

COPY . /Data

CMD mongoimport --host mongo-users:3220 --db BookymeUsers --collection users --type json --file Data/Users.json --jsonArray