pipeline {

  environment {
    dockerimagename = "cyberbrace/bmi-server-stp"
    dockerImage = ""
  }

  agent any

  stages {
    
    stage('Checkout Source') {
      steps {
        git branch: 'main', credentialsId: 'teloyeleye-git', url: 'https://github.com/teloyeleye/bmi-backend.git'
      }
    }
    
    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhublogin'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

  }

}
