set :application, "app-name"
set :deploy_to, "/var/www/#{fetch(:application)}"
set :repo_url, "git@github.com-frontend:aasatech/app-name.git"
set :nvm_node, 'v21.7.3'

server "54.199.165.160", user: "deployer", roles: %w{app db web}

namespace :deploy do
  task :build_dist do
    on roles :all do
      within release_path do
        execute "cd #{release_path} && #{fetch(:nvm_prefix)} yarn build"
      end
    end
  end

  task :restart do
    on roles :all do
      within current_path do
        execute "cd #{current_path} && #{fetch(:nvm_prefix)} pm2 startOrRestart app.json"
      end
    end
  end

  before 'deploy:publishing', :build_dist
  after 'deploy:publishing', :restart
end
