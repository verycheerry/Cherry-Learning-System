pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/verycheerry/Cherry-Learnign-System.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cherry-learning-system .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker stop cherry-learning-container || true
                docker rm cherry-learning-container || true
                docker run -d -p 80:3000 --name cherry-learning-container cherry-learning-system
                '''
            }
        }
    }
}
