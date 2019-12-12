@app
init

@http

# SERVICE DESK: ADD USER TO COURSE
get /login
get /adduser
post /adduser

## Uncomment the following lines to deploy to AWS!
# @aws
# profile default
# region us-west-1
# bucket your-private-deploy-bucket
  