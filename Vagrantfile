# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|

  config.vm.define "tshark" do |tshark|
    tshark.vm.box = "hashicorp/bionic64"
    tshark.vm.network "private_network", ip: "192.168.33.10"
    tshark.vm.provision "shell", path: "provision-tshark.sh"
  end

  config.vm.define "web" do |web|
    web.vm.box = "hashicorp/bionic64"
    web.vm.network "private_network", ip: "192.168.33.11"
    web.vm.provision "shell", path: "provision-web.sh"
  end

  config.vm.define "db" do |db|
    db.vm.box = "hashicorp/bionic64"
    db.vm.network "private_network", ip: "192.168.33.12"
    db.vm.provision "shell", path: "provision-db.sh"
  end

  config.vm.define "intruder" do |intruder|
    intruder.vm.box = "kalilinux/rolling"
    intruder.vm.network "private_network", ip: "192.168.33.66"
  end

  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

end
