pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/verycheerry/Cherry-Learnign-System.git'
        IMAGE_NAME = 'cherry-learning-system'
        CONTAINER_NAME = 'cherry-learning-container'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "https://github.com/verycheerry/Cherry-Learnign-System.git"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install.'
            }
        }


    post {
        success {
            echo 'Pipeline completed successfully. Application deployed.'
        }

        failure {
            echo 'Pipeline failed. Please check the console output.'
        }
    }
}
