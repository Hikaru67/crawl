const cron = require('node-cron');
const axios = require('axios')

cron.schedule('*/1 * * * *', run, {
	scheduled: true,
	timezone: 'Asia/Ho_Chi_Minh',
});

async function run() {
    const wishId = 2789492037
	const topLike = await getTopLike()
    console.log('topLike:', topLike)
    const currentLike = await getTopLike(wishId)
    console.log('currentLike:', currentLike)

    const additional = (topLike - currentLike > 0) ? topLike - currentLike + 5 : 0
    console.log('Cần thêm:', additional)

    const jobs = []
    for (i = 0; i < additional; i++) {
        jobs.push(like(wishId))
    }

    await Promise.all(jobs)
    console.log('Done số like hiện tại: ', await getTopLike(wishId))
    console.log()
}

async function like(wishId) {
	try {
		const { data } = await axios.post(
			'https://padlet.com/api/5/reactions',
			{
				wish_id: wishId,
				value: 1,
				reaction_type: 'like',
			},
			{
				headers: {
					Authorization: 'Bearer 123',
					Cookie: 'ww_p=Q0RnejJXSC9aY2xJTHRaOUVueUVkMjREMEJXb016Kzl5bDMyZXdEVjVpUTdwR3VoUVNxazk2OFJ3TlpwRXdvQ3Noakt1MEJlc3dtRDNpeFZIVTVMSjRvK2JCTmlqUk84YVRla3QxbnJuNVFOTy9NWmk4bU5HWEtPdWhwdUZPR0NzNUNTSElJdXdQQjdpaGZnTm15L0U0RmJnbXJmSDZFYnhqdklDTjhjREQyTlV2djVRdjhWTFRHMC9xaUF3dkY0TUtGaXBrZk5ZS0lZeVdBdjZ1RWI1K2IzcmtYbzdsMnpyZzVkZHF1TElQL2ZybFZCK1k0Z1E4Ulc0akhTQjhOTlNwSGJpbDdtdmVpWmkzZTM5MHAxZjV4REQvZTR1dzE1bHluaWcwZDUvb21tQTJQUU5hOVZaRjMvVERNVnViZlVFZ3ZBRG9LOUVxTEpCMkRnQWVBRThwTm9rWkFhcnRXaGNXbVFRSU1JMUNnSnZMTmtSZEFRZ0U2TFRZcE56NlFCLS01UGdpdFlGbmUwK2dIVTB5VWp1SURnPT0=--123',
				},
			}
		);
		return data;
	} catch (err) {
		console.log('=>>> ~ err', err);
	}
}

async function comment(wishId) {
	try {
		const { data } = await axios.post(
			'https://padlet.com/api/5/comments',
			{
				wish_id: wishId,
				body: COMMENTS[Math.floor(Math.random() * 200 + 35)],
			},
			{
				headers: {
					Authorization: 'Bearer 123',
					Cookie: 'ww_p=Q0RnejJXSC9aY2xJTHRaOUVueUVkMjREMEJXb016Kzl5bDMyZXdEVjVpUTdwR3VoUVNxazk2OFJ3TlpwRXdvQ3Noakt1MEJlc3dtRDNpeFZIVTVMSjRvK2JCTmlqUk84YVRla3QxbnJuNVFOTy9NWmk4bU5HWEtPdWhwdUZPR0NzNUNTSElJdXdQQjdpaGZnTm15L0U0RmJnbXJmSDZFYnhqdklDTjhjREQyTlV2djVRdjhWTFRHMC9xaUF3dkY0TUtGaXBrZk5ZS0lZeVdBdjZ1RWI1K2IzcmtYbzdsMnpyZzVkZHF1TElQL2ZybFZCK1k0Z1E4Ulc0akhTQjhOTlNwSGJpbDdtdmVpWmkzZTM5MHAxZjV4REQvZTR1dzE1bHluaWcwZDUvb21tQTJQUU5hOVZaRjMvVERNVnViZlVFZ3ZBRG9LOUVxTEpCMkRnQWVBRThwTm9rWkFhcnRXaGNXbVFRSU1JMUNnSnZMTmtSZEFRZ0U2TFRZcE56NlFCLS01UGdpdFlGbmUwK2dIVTB5VWp1SURnPT0=--123',
				},
			}
		);
		return data;
	} catch (err) {
		console.log('=>>> ~ err', err);
	}
}

async function getTopLike(wishId = 0) {
	try {
		const { data } = await axios.get(
			'https://padlet.com/api/5/accumulated_reactions?wall_id=176081104'
		);

        if (wishId) {
            return data.data.attributes[wishId].sum
        }

		const topLike = Object.values(data.data.attributes).sort(
			(a, b) => b.sum - a.sum
		)[0].sum;
		return topLike
	} catch (err) {
		console.log('err:', err);
	}
}
