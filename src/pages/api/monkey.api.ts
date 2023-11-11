import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from 'path';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`
                _
            ,.-" "-.,
           /   ===   \
          /  =======  \
       __|  (o)   (0)  |__      
      / _|    .---.    |_ \         
     | /.----/ O O \----.\ |       
      \/     |     |     \/        
      |                   |            
      |                   |           
      |                   |          
      _\   -.,_____,.-   /_         
  ,.-"  "-.,_________,.-"  "-.,
 /          |       |          \  
|           l.     .l           | 
|            |     |            |
l.           |     |           .l             
 |           l.   .l           | \,     
 l.           |   |           .l   \,    
  |           |   |           |      \,  
  l.          |   |          .l        |
   |          |   |          |         |
   |          |---|          |         |
   |          |   |          |         |
   /"-.,__,.-"\   /"-.,__,.-"\"-.,_,.-"\
  |            \ /            |         |
  |             |             |         |
   \__|__|__|__/ \__|__|__|__/ \_|__|__/ Nery meu pau 
    `);
  const filePath = path.resolve(".", 'monkey.jpg');
  const imageBuffer = fs.readFileSync(filePath)

  res.setHeader('Content-Type', 'image/jpg'); 
  return res.send(imageBuffer);
}