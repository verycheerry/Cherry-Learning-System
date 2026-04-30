pipeline {
    agent any

    tools {
        nodejs 'NodeJS-18'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Loading application from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t cherry-learning-system .'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                echo 'Scanning Docker image for vulnerabilities...'
                sh 'trivy image --severity CRITICAL --exit-code 1 cherry-learning-system'
            }
        }

        stage('Run Container (Test Deployment)') {
            steps {
                echo 'Running container for testing...'
                sh '''
                docker stop cherry-container || true
                docker rm cherry-container || true
                docker run -d -p 80:3000 --name cherry-container cherry-learning-system
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. Application deployed.'
        }
        failure {
            echo 'Pipeline failed due to vulnerabilities or build errors.'
        }
    }
}
