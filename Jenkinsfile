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
          environment {
            PATH = '~/.nvm/versions/node/v16.19.1/bin'
          }
          steps {
            sh 'npm install'
          }
        }

      }
    }

  }
}