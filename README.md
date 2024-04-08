## Steps

Might need to go to specific microservice directory for each step.

# Step 1 : Add to Artifact Registry

Go to microservice directory (./), copy and paste Artificat Registry location and include new name at end of directory

gcloud builds submit -t us-west1-docker.pkg.dev/cmpt474-413923/microservices/microservice2 ./

# Step 2 : Add service to Kubernetes (if not already existed)

run service.yaml file for specific microservice

kubectl apply -f ./kubernetes-manifests/service.yaml

# Step 3 : Add workload to Kubernetes

update image being uploaded in deployment.yaml file with image uploaded in step 1

kubectl apply -f ./kubernetes-manifests/deployment.yaml

# Step 4 : Update Ingress

kubectl apply -f ./kubernetes-manifests/ingress.yaml
