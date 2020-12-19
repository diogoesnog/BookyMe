#!/bin/bash
ls .
mongoimport --host mongo:3221 --db BookymeStores --collection stores --file stores.json