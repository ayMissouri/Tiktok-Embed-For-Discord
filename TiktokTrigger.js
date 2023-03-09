const fetch = require("node-fetch");
module.exports = {
	name: ["https://vm.tiktok.com", "https://www.tiktok.com"],

	execute(message, args) {
		if (args.toString().length > 30) {
			const optionss = {
				method: "GET",
				headers: {
					"X-RapidAPI-Key": "RapidAPI Auth Key",
					"X-RapidAPI-Host": "tiktok-video-no-watermark2.p.rapidapi.com",
				},
			};

			fetch(
				`https://tiktok-video-no-watermark2.p.rapidapi.com/?url=${args[0]}`,
				optionss
			)
				.then((response) => response.json())
				.then((response) => {
					if (response.code === 0) {
						const options = {
							method: "GET",
						};

						fetch(
							`http://tinyurl.com/api-create.php?url=${response.data.play}`,
							options
						)
							.then((response) => response.text())
							.then(message.delete())
							.then((text) =>
								message.channel.send({
									content: `${message.author.toString()} \n ${text}`,
								})
							);
					} else {
						message.reply({
							content: `Invalid link, please check and try again.`,
							ephemeral: true,
						});
					}
				})
				.catch((error) => {
					throw error;
				});
		} else {
			message.channel.send({
				content: `That is not a valid tiktok video`,
				ephemeral: true,
			});
		}
	},
};
