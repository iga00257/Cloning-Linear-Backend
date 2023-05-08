import * as fs from 'fs';
import * as path from 'path';
import { Request, Response } from 'express';
const CONFIG_PATH = path.join(__dirname, '../../config');
enum CONFIG_TEMPLATE_PATH {
    classification = '/template/classification',
    objectdetection = '/template/objectdetection/detectnet_v2.conf.json',
    segmentation = '/segmentation/template/config.json',
}


interface ProjectInfo {
    projectId: string;
    type: string;
  }
interface updateConfig {
    projectId: string;
    updateOptions:JsonObject;
    }


interface JsonObject  {
[key: string]: any;
};

interface UpdateOptions  {
mergeNonExistingKeys?: boolean;
customPath?: string;
};
  
async function updateJsonFile(
    fileName: string,
    jsObject: JsonObject,
    options: UpdateOptions = {}
  ): Promise<void> {
    const filePath = path.join(options.customPath || ".", `${fileName}.json`);
  
    try {
      let fileContent: JsonObject;
  
      if (fs.existsSync(filePath)) {
        const fileData = await fs.promises.readFile(filePath, "utf-8");
  
        try {
          fileContent = JSON.parse(fileData);
        } catch (error) {
          console.error("JSON 格式錯誤：", error);
          return;
        }
      } else {
        fileContent = {};
        await fs.promises.writeFile(filePath, JSON.stringify(fileContent), "utf-8");
      }
  
      for (const key in jsObject) {
        if (options.mergeNonExistingKeys || Object.prototype.hasOwnProperty.call(fileContent, key)) {
          fileContent[key] = jsObject[key];
        }
      }
  
      await fs.promises.writeFile(filePath, JSON.stringify(fileContent), "utf-8");
    } catch (error) {
      console.error("無法更新 JSON 文件：", error);
    }
  }


class ConfigController {
    
    async createConfig(req: Request, res: Response): Promise<void> {
        const { projectId, type } = req.body as ProjectInfo;
        console.log(projectId, type)
        const folderName = projectId;
        const folderPath = path.join(CONFIG_PATH, folderName);
        const filePath = path.join(folderPath, 'config.json');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            // fs.writeFileSync(filePath, fileContent);
          } else {
          }
 
        // copy template file to project folder

        if (!fs.existsSync(filePath)) {
            switch (type) {
                case 'objectdetection':
                    try {
    
                        fs.copyFileSync(path.join(CONFIG_PATH,CONFIG_TEMPLATE_PATH.objectdetection), filePath);
                        console.log('template 已成功複製');
                        
                    } catch (error) {
                        console.log("文件複製失敗",error)
                    }
                    break;
                case 'classification':
                    fs.copyFileSync(CONFIG_TEMPLATE_PATH.classification, folderPath);
                    break;
                default:
                    break;
            }
        }else{
            console.log('config.json 已存在')
        }
        res.status(200).send('Project folder created successfully');
    }

    async updateConfig(req: Request, res: Response): Promise<void> {
        const fileName = "config";
        const { projectId,updateOptions } = req.body as updateConfig;
        const folderName = projectId;
        const folderPath = path.join(CONFIG_PATH, folderName);
        const filePath = path.join(folderPath, 'config.json');

        const options: UpdateOptions = {
        mergeNonExistingKeys: true,
        customPath:folderPath
        };

        if (!fs.existsSync(filePath)) {
            console.log('config.json 不存在')
            res.status(404).send('config.json 不存在');
            return
        }

        await updateJsonFile(fileName, updateOptions, options)
        .then(() => {
            res.status(200).send(' JSON 文件更新成功');
            console.log("JSON 文件更新成功")
        })
        .catch((error) => console.error(error));
        
    }

    async getConfig(req: Request, res: Response): Promise<void> {
        const projectId = req.query.projectId as string;
        const folderName = projectId;
        const folderPath = path.join(CONFIG_PATH, folderName);
        const filePath = path.join(folderPath, 'config.json');
        if (fs.existsSync(filePath)) {
            const fileData = await fs.promises.readFile(filePath, "utf-8");
            let fileContent: JsonObject;
            try {
                fileContent = JSON.parse(fileData);
            }
            catch (error) {
                console.error("JSON 格式錯誤：", error);
                return;
            }
            res.status(200).send(fileContent);
            
        }else{
            res.status(404).send('config.json 不存在');
        }
    }

}
export default new ConfigController();