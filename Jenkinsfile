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

        stage('SonarQube Code Quality Scan') {
            steps {
                echo 'Running SonarQube code quality scan...'
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=cherry-learning-system \
                        -Dsonar.projectName=Cherry-Learning-System \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=node_modules/** \
                        -Dsonar.host.url=http://50.17.88.9:9000
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                echo 'Waiting for SonarQube Quality Gate result...'
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t cherry-learning-system .'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check SonarQube Quality Gate or build logs.'
        }
    }
}
