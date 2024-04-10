import { useState } from "react";
import { ArcElement, Chart } from "chart.js";
import { useAddClientMutation, useGetClientsQuery } from "./api/clientsApiSlice";

import styles from "./Clients.module.scss";
import { animals, colors, names, starWars, uniqueNamesGenerator } from "unique-names-generator";
import { Client } from "./Client";
import { Info } from "../../components/info/Info";
import { Error } from "../../components/error/Error";
import { Button } from "../../components/button/Button";
import { Spinner } from "../../components/spinner/Spinner";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Chart.register(ArcElement);

export const Clients = () => {
  const [query, setQuery] = useState("");
  const { data: clients = [], isLoading: isLoadingClients } = useGetClientsQuery();
  const [addClient, { isLoading: isAddingClient }] = useAddClientMutation();

  const handleAddClient = async () => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [starWars, animals, names, colors],
      separator: " ",
      length: 2,
      style: "capital"
    });

    try {
      await addClient({ name: randomName }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const renderClientsList = () => {
    const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(query.toLowerCase()));

    return filteredClients.length > 0 ? filteredClients
      .map(({ id, name }) => (
        <Client
          key={id}
          id={id}
          name={name}
        />
      )) : <Error text={"No clients match search criteria."} />
  }

  return (
    <div className={styles.clients}>
      <Spinner isLoading={isLoadingClients || isAddingClient} />
      <div className={styles.header}>
        <Button
          text={"New Client"}
          onClick={handleAddClient}
          disabled={isLoadingClients || isAddingClient}
        />
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Client search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
        </div>
      </div>
      <div className={styles.list}>
        {clients.length > 0 ? renderClientsList() : <Info text={"No Clients. Use \"New Client\" button to add one."} />}
      </div>
    </div>
  );
};