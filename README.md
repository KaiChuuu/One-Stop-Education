## System Design

Developed within Google Cloud.

<a href="https://github.com/RedDogClifford/One-Stop-Education/">
  <img src="/onestopedc-systemdesign.jpg" width="720" height="380">
</a>

## Project Description

One Stop Education is a “one-stop” website that contains all the necessary resources to help
support a student's education through K-12. The goal is to make learning easier, faster, and fun
for students. To do this, One Stop Education provides a collection of learning tools for a wide
range of topics covering all grades and courses.

## Implmentation Details

Frontend is hosted on a Cloud Run instance because of its scalable infrastructure. It is simple to
set up, easy to manage and provides a pay-per-use affordability.

Managed backend services through Kubernetes. Within the Kubernetes Cluster, each
microservice was hosted through pods for scalability. A single microservice was managed
through a Kubernetes Service to handle traffic across replicated pods. A workload was created
to run the program and traffic was managed by a load balancer that separated requests through
an Ingress.

The backend microservices were hosted on Node.js as they provided a fast runtime
environment to host the Express servers for each service.
Data was stored within separate Entities within Firestore. Access to modify data was created
through a single Google Cloud Service Account which was only accessible within the
Kubernetes cluster.

Additional cached data was stored through Cloud Storage in buckets or on user-side clients.


### Steps to update services

Might need to go to specific microservice directory for each step.

#### Step 1 : Add to Artifact Registry

Go to microservice directory (./), copy and paste Artificat Registry location and include new name at end of directory

gcloud builds submit -t us-west1-docker.pkg.dev/cmpt474-413923/microservices/microservice2 ./

#### Step 2 : Add service to Kubernetes (if not already existed)

run service.yaml file for specific microservice

kubectl apply -f ./kubernetes-manifests/service.yaml

#### Step 3 : Add workload to Kubernetes

update image being uploaded in deployment.yaml file with image uploaded in step 1

kubectl apply -f ./kubernetes-manifests/deployment.yaml

# Step 4 : Update Ingress

kubectl apply -f ./kubernetes-manifests/ingress.yaml
