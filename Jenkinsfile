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
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Code Quality Scan') {
            steps {
                echo 'Running SonarQube scan...'
                sh '''
                sonar-scanner \
                -Dsonar.projectKey=cherry-learning-system \
                -Dsonar.projectName=Cherry-Learning-System \
                -Dsonar.sources=. \
                -Dsonar.host.url=http://localhost:9000
                '''
            }
        }

        stage('Trivy File System Scan') {
            steps {
                echo 'Running Trivy dependency and file scan...'
                sh 'trivy fs --exit-code 0 --severity HIGH,CRITICAL .'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Trivy Docker Image Scan') {
            steps {
                echo 'Running Trivy image scan...'
                sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL $IMAGE_NAME'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir('terraform') {
                    sh 'terraform validate'
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p 80:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
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
