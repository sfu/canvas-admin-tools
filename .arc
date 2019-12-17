@app
init

@http
get /login
get /adduser
post /adduser

@tables
arc-sessions
  _idx *String

@static

## Uncomment the following lines to deploy to AWS!
# @aws
# profile default
# region us-west-1
# bucket your-private-deploy-bucket
  