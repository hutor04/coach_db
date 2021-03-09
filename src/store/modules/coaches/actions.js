export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;

    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    try {
      await fetch(`https://coachdb-df1ad-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(coachData),
      });
    } catch (err) {
      console.log(err);
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context) {
    try {
      const response = await fetch(`https://coachdb-df1ad-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
      const responseData = await response.json();

      const coaches = [];

      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        }
        coaches.push(coach);
      }

      context.commit('setCoaches', coaches);

    } catch (err) {
      console.log(err);
    }

  },
};
