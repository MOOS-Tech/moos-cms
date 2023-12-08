function decrypt(encryptedText, key) {
    const decodedText = atob(encryptedText);
    let result = '';
    for (let i = 0; i < decodedText.length; i++) {
      const charCode = decodedText.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
 }
const val = decrypt("NilxBQMVNgEyGQooKwc2GikDMEMLCREMJEBvXRcyNDtsOlFJIjttOykzNEMMPj1BUA0wOQxIETcuAw0cKwg9CjA2PEMO",'en_key') 
module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'aws-s3',
            providerOptions: {
                baseUrl: env('CDN_URL'),
                rootPath: env('CDN_ROOT_PATH'),
                s3Options: {
                    accessKeyId: env('AWS_ACCESS_KEY_ID'),
                    secretAccessKey: env('AWS_ACCESS_SECRET'),
                    region: env('AWS_REGION'),
                    params: {
                        Bucket: env('AWS_BUCKET'),
                    },
                },
            },
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                xsmall: 64
            },
            actionOptions: {
                upload: {
                    ACL: null
                },
                uploadStream: {
                    ACL: null
                },
                delete: {
                    ACL: null
                },
            },
        },
    },
    // email: {
    //     provider: 'amazon-ses',
    //     providerOptions: {
    //       key: env('AWS_ACCESS_KEY_ID'),
    //       secret:  env('AWS_ACCESS_SECRET'),
    //       amazon: `https://email.eu-west-1.amazonaws.com`
    //     },
    //     settings: {
    //       defaultFrom: 'info@moos.nu',
    //       defaultReplyTo: 'info@moos.nu'
    //     }
    //   },
    email: {
        config: {
          provider: 'sendgrid',
          providerOptions: {
            apiKey:val,
          },
          settings: {
            defaultFrom: 'dhanushka.a@blackvt.com',
            defaultReplyTo: 'dhanushka.a@blackvt.com',
            testAddress: 'dhanushka.a@blackvt.com',
          },
        },
      },
});