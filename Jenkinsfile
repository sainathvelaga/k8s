pipeline {
    agent {
        label 'AGENT-1'
    }
    environment {
        PROJECT_ID = 'kubernetes-project'
        CLUSTER_NAME = 'expense'
        LOCATION = 'us-east-1'
        CREDENTIALS_ID = 'eks'
        DOCKERHUB_CREDENTIALS = credentials('DOCKERHUB_CREDENTIALS')
        APP_NAME = 'kubernetes-project'
        IMAGE_TAG = 'latest'
        IMAGE_NAME = "${APP_NAME}:${IMAGE_TAG}"
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/omkarsuperb/k8s.git']]])
            }
        }
        stage('Docker build'){
            steps {
                script {
                    // Load Docker Hub credentials from Jenkins credentials store
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKERHUB_USERNAME', 
                    passwordVariable: 'DOCKERHUB_PASSWORD')]) 
                    {
                        // Login to Docker Hub
                        sh "docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD"
                        // Build the Docker image
                        sh "docker build -t $IMAGE_NAME ."
                        // Tag the Docker image
                        sh "docker tag $IMAGE_NAME $DOCKERHUB_USERNAME/$IMAGE_NAME"
                        // Push the Docker image to Docker Hub
                        sh "docker push $DOCKERHUB_USERNAME/$IMAGE_NAME"
                        echo "Docker image $DOCKERHUB_USERNAME/$IMAGE_NAME pushed successfully."
                    }
                }
            }
        }

	stage('Creating Artifact'){
            steps{
                archiveArtifacts artifacts: 'manifest/deployment.yaml', followSymlinks: false
                 }
        }

    stage('Deploy to EKS') {

            steps {
                script {
                    dir('manifest') {
                        // # Update packages inside the cluster
                        sh "aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${LOCATION} "
                        //Deploy an application
                        sh "kubectl apply -f deployment.yaml --validate=false"
                        //Deploy a service
                        sh "kubectl apply -f ingress.yaml --validate=false"
                    }
                }
            }

    }
}
}
