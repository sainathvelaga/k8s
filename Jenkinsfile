pipeline {
    agent any
    environment {
        PROJECT_ID = 'kubernetes-project-340710'
        CLUSTER_NAME = 'gke-cluster'
        LOCATION = 'asia-south1-a'
        CREDENTIALS_ID = 'jenkins-gke'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/omkarsuperb/jenkins-pipeline.git']]])
            }
        }
        stage("Build image") {
            steps {
                script {
                      Img = docker.build(
                          "gcr.io/kubernetes-project-340710/new",
                          "-f Dockerfile ."
                          )
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    withDockerRegistry([credentialsId: "gcr:gcr", url: "https://gcr.io"]) {
                      sh "docker push gcr.io/kubernetes-project-340710/new"
                    }
                }
            }
        }
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/latest/${env.BUILD_ID}/g' manifest/deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'manifest/deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
	    }
     }
}
