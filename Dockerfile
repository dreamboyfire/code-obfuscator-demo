FROM node:12-buster-slim

# 安装https证书
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates

# 修改时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# 切换node源
# RUN npm config set registry https://registry.npm.taobao.org 

# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

WORKDIR /stemp
# 拷贝代码进容器
COPY . /stemp

# RUN cnpm install javascript-obfuscator@2.9.4

# RUN cnpm install lodash@4.17.4

# RUN mkdir /myapp && chmod 777 /stemp && chmod 777 /myapp && chmod 777 /stemp/code-obfuscator/index.js

# 进入加密文件夹
# WORKDIR /myapp

RUN rm -rf package-lock.json

# RUN npm install

# RUN npm install -g pm2@4.4.1

# RUN pm2 install pm2-logrotate

# RUN pm2 set pm2-logrotate:max_size 10M

# RUN rm -rf deploy

# 执行加密

CMD node ./code-obfuscator/index.js

# 暴露端口
EXPOSE 3018 3019 3020 3021 5019

# VOLUME ["/myapp","/root/.pm2"]

# CMD exec pm2-docker start ${PM2_CONFIG_FILE}

# CMD exec node ./test/demo3.js

