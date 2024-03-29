import React from 'react';
import styled from 'styled-components';
import { color } from '../helpers';

const LegendContainer = styled.div`
  background-color: #eaeaea;
  display: grid;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  grid-gap: 16px;
  margin-top: 20px;
  padding: 16px;

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LegendKey = styled.div`
  align-items: stretch;
  display: grid;
  grid-auto-rows: 60px;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: 80px;
  height: 100%;
  justify-items: stretch;
`;

const Legend = props => {
  const groups = props.data.children.map(node => node.data.id);
  const types = props.data.children[0].children
    .map(node => {
      return { name: node.data.name, id: node.data.group };
    })
    .sort((a, b) => {
      if (a.id === 'domestic') {
        return -1;
      }
      if (b.id === 'domestic') {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

  return (
    <LegendContainer>
      <div>
        <p>
          <strong>Domestic equity</strong> includes real estate investment
          trusts and sponsoring company stock.
          <br />
          <strong>International equity</strong> includes real estate investment
          trusts.
          <br />
          <strong>Fixed income</strong> includes domestic, global, and
          international fixed income assets and stable value assets.
          <br />
          <strong>Other</strong> includes global equity, private equity, equity
          real estate excluding real estate investment trusts, target date
          assets, annuities, and other alternatives.
        </p>
        <p>
          Not every fund in the Pensions &amp; Investments survey reported how
          they invested their assets. Within the survey, allocation was reported
          for 72 percent of defined benefit (DB) assets and 39 percent of
          defined contribution (DC) assets. To estimate the asset allocation of
          non-reporting plans to create the interactive tool, we assumed they
          had the same average as the plans that did report.
        </p>
      </div>
      <LegendKey cols={groups.length + 1}>
        {types.map(type => {
          const theGroups = groups.map(group => {
            return (
              <div
                key={`legend-${group}-${type.id}`}
                style={{
                  backgroundColor: color(group, type.id),
                  marginBottom: type.id === 'domestic' ? '20px' : 0,
                }}
              />
            );
          });

          theGroups.unshift(
            <strong
              style={{
                alignSelf: 'center',
                marginBottom: type.id === 'domestic' ? '20px' : 0,
                paddingRight: '10px',
                textAlign: 'right',
              }}
            >
              {type.name}
            </strong>
          );

          return theGroups;
        })}
      </LegendKey>
    </LegendContainer>
  );
};

export default Legend;
