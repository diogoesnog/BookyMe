FROM mongo 

COPY . /Data

CMD mongoimport --host mongo-users:3221 --db BookymeUsers --collection users --type json --file Data/stores.json --jsonArray