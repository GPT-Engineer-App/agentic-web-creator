import logging

class PluginManager:
    def __init__(self):
        self.plugins = {}
        logging.info("PluginManager initialized")

    def load_plugin(self, plugin_name, plugin):
        self.plugins[plugin_name] = plugin
        logging.info(f"Plugin {plugin_name} loaded")

    def get_plugin(self, plugin_name):
        return self.plugins.get(plugin_name)