pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.57.0-noble' } } 
   stages {
      stage('e2e-tests') {
         steps {
            //git url : 'https://github.com/MarielaCN/PR.git' , branch: 'master' //con esto le digo que se descargue mi repositorio de github que esta en la rama master (no es necesario usando este archivo Jenkinfile, solo slo uso en caso de no tener el archivo y querer dejar este scripr directamente en la configuracion del pipeline de jenkins)
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }

post {
    always{
        publishHTML([
                    reportName: 'Playwright Report',
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild:true,
                    allowMissing: false
                    ])
           }
    }
}
   
