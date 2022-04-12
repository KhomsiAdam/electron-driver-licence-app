import * as fs from 'fs';

const createEntityFolder = (templatePath: string, newProjectPath: string) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = `${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${newProjectPath}/${file}`);
      createEntityFolder(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
};

export default createEntityFolder;
