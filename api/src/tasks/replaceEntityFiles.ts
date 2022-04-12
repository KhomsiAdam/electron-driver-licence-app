import * as fs from 'fs';

const replaceEntityFiles = (newEntityPath: string, entityName: string) => {
  const filesToModify = fs.readdirSync(newEntityPath);

  filesToModify.forEach(file => {
    const newFilePath = `${newEntityPath}/${file}`;
    const stats = fs.statSync(newFilePath);

    if (stats.isFile()) {
      const writePath = `${newEntityPath}/${file}`;

      fs.readFile(writePath, 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        var result = data.replace(/{{lowercaseName}}/g, entityName.toLowerCase())
          .replace(/{{uppercaseName}}/g, entityName.toUpperCase())
          .replace(/{{capitalizedName}}/g, entityName.charAt(0).toUpperCase() + entityName.slice(1));
        fs.writeFile(writePath, result, 'utf8', (err) => {
          if (err) {
            return console.log(err);
          }
        });
      });
    }
    // } else if (stats.isDirectory()) {
    //   fs.mkdirSync(`${newEntityPath}/${file}`);
    //   // replaceEntityFiles(`${newEntityPath}/${file}`, `${newEntityPath}/${entityName}`);
    // }
  });
};

export default replaceEntityFiles;
