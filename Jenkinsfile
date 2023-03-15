pipeline {
  agent any
  stages {
    stage('git checkout') {
      steps {
        git(url: 'https://github.com/Hbrehman/reactgram.git', branch: 'main')
      }
    }

    stage('print current directory') {
      parallel {
        stage('print current directory') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Install dependencies') {
          steps {
            sh 'source /home/ec2-user/.nvm/nvm.sh && nvm use 16.19.1 && npm install'
          }
        }

      }
    }

  }
}